import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetchAccountsById } from "@/src/services/getAccounts";
import { Account, AccountStateItem } from "../models/accounts.model";

// Definir la estructura del estado global
interface AccountState {
  accounts: AccountStateItem[];
  loading: boolean;
  error: string | null;
  fetchAccountsByIds: (accounts_numbers: (string | number)[]) => Promise<void>;
}

const LOCAL_STORAGE_KEY = "accounts_data_v2";

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      accounts: [],
      loading: false,
      error: null,

      fetchAccountsByIds: async (accounts_numbers = []) => {
        if (accounts_numbers.length === 0) return;

        set({ loading: true, error: null });

        try {
          // Obtener cuentas que ya tenemos en el estado (hidratadas de localStorage)
          const localAccounts = get().accounts;

          // Llamada a la API para traer datos frescos de cada cuenta
          const responses = await Promise.all(
            accounts_numbers.map((num) => fetchAccountsById(num)),
          );

          // MERGE INTELIGENTE entre lo que viene de la API y lo que tenemos localmente
          const accountsData: AccountStateItem[] = accounts_numbers.map(
            (idEnviado, index) => {
              const dataDeApi: Account = responses[index];
              const idStr = idEnviado.toString();

              // Se busca si ya esta la cuenta guardada localmente (para no perder saldos actualizados)
              const existingAccount = localAccounts.find(
                (a) => a.account_number === idStr,
              );

              return {
                account_id: idStr,
                account_number: idStr,
                type: dataDeApi.alias || "Cuenta de Ahorro",
                // Si existe localmente, se usa ese saldo. Si no, el de la API.
                balance: existingAccount
                  ? Number(existingAccount.balance)
                  : Number(dataDeApi.balance) || 0,
                currency: dataDeApi.currency || "NIO",
              };
            },
          );

          // Al actualizar el estado, 'persist' guarda automáticamente en localStorage
          set({ accounts: accountsData, loading: false });
        } catch (error: any) {
          console.error("Error en el store de cuentas:", error);
          set({
            error: error.message || "Error al sincronizar cuentas",
            loading: false,
          });
        }
      },
    }),
    {
      name: LOCAL_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Solo persistimos la lista de cuentas, ignoramos loading y error.
      partialize: (state) => ({ accounts: state.accounts }),
    },
  ),
);
