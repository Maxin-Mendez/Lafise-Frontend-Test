import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetchAccountsById } from "@/src/services/getAccounts";
import { Account, AccountStateItem } from "../models/accounts.model";

interface AccountState {
  accounts: AccountStateItem[];
  loading: boolean;
  error: string | null;
  fetchAccountsByIds: (accounts_numbers: (string | number)[]) => Promise<void>;
  clearError: () => void;
}

const LOCAL_STORAGE_KEY = "accounts_data_v2";

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      accounts: [],
      loading: false,
      error: null,

      // Limpiar el estado de error
      clearError: () => set({ error: null }),

      fetchAccountsByIds: async (accounts_numbers = []) => {
        if (accounts_numbers.length === 0) return;

        set({ loading: true, error: null });

        try {
          const localAccounts = get().accounts;

          // Llamada a la API
          const responses = await Promise.all(
            accounts_numbers.map((num) => fetchAccountsById(num)),
          );

          const accountsData: AccountStateItem[] = accounts_numbers.map(
            (idEnviado, index) => {
              const dataDeApi: Account = responses[index];
              const idStr = idEnviado.toString();

              // Buscar si ya existe localmente
              const existingAccount = localAccounts.find(
                (a) => a.account_number === idStr,
              );

              return {
                account_id: idStr,
                account_number: idStr,
                type: dataDeApi.alias || "Cuenta de Ahorro",
                balance: existingAccount
                  ? Number(existingAccount.balance)
                  : Number(dataDeApi.balance) || 0,
                currency: dataDeApi.currency || "NIO",
              };
            },
          );

          set({ accounts: accountsData, loading: false, error: null });
        } catch (error: any) {
          console.error("Error en el store de cuentas:", error);

          let friendlyMessage = "Error al sincronizar cuentas.";

          if (error.code === "ERR_NETWORK" || !error.response) {
            friendlyMessage =
              "Servidor no disponible. Verifica si la API está levantada.";
          } else if (error.response?.status === 404) {
            friendlyMessage =
              "No se encontraron algunas de las cuentas solicitadas.";
          }

          set({
            error: friendlyMessage,
            loading: false,
          });
        }
      },
    }),
    {
      name: LOCAL_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ accounts: state.accounts }),
    },
  ),
);
