import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetchTransactions } from "@/src/services/getAccountsTransactions";
import { Transaction, TransactionResponse } from "../models/transactions.model";

interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetchTransactionsByAccount: (
    accounts_numbers: (string | number)[],
  ) => Promise<void>;
  addTransaction: (transaction: Transaction) => void;
}

const LOCAL_STORAGE_KEY = "transactions_data_v2";

export const useTransactionsStore = create<TransactionsState>()(
  persist(
    (set, get) => ({
      transactions: [],
      loading: false,
      error: null,

      fetchTransactionsByAccount: async (accounts_numbers) => {
        if (!accounts_numbers || accounts_numbers.length === 0) return;

        set({ loading: true, error: null });

        try {
          const responses = await Promise.all(
            accounts_numbers.map((account) => fetchTransactions(account)),
          );

          const serverTransactions = responses.flatMap(
            (res: TransactionResponse) => res.items || [],
          );

          set((state) => {
            const currentTransactions = state.transactions;

            // Identificar IDs del servidor
            const serverIds = new Set(
              serverTransactions.map((tx) => tx.transaction_number),
            );

            // Filtramos locales que no están en el servidor (pendientes de sincronizar)
            const localOnly = currentTransactions.filter(
              (tx) => !serverIds.has(tx.transaction_number),
            );

            // Se une todo en un array temporal
            const rawCombined = [...localOnly, ...serverTransactions];

            // FILTRO DE UNICIDAD FINAL (Mecanismo de seguridad)
            // Esto elimina duplicados si la API devuelve lo mismo para dos cuentas
            // o si había basura en el localStorage.
            const uniqueCombined = rawCombined.filter(
              (tx, index, self) =>
                index ===
                self.findIndex(
                  (t) => t.transaction_number === tx.transaction_number,
                ),
            );

            // Ordenar por fecha
            const combined = uniqueCombined.sort(
              (a, b) =>
                new Date(b.transaction_date).getTime() -
                new Date(a.transaction_date).getTime(),
            );

            return { transactions: combined, loading: false };
          });
        } catch (error: any) {
          set({
            error: error.message || "Error al sincronizar transacciones",
            loading: false,
          });
        }
      },

      addTransaction: (transaction: Transaction) => {
        set((state) => {
          // También se valida aquí para no agregar una transacción que ya existe
          const exists = state.transactions.some(
            (t) => t.transaction_number === transaction.transaction_number,
          );
          if (exists) return state;

          return { transactions: [transaction, ...state.transactions] };
        });
      },
    }),
    {
      name: LOCAL_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ transactions: state.transactions }),
    },
  ),
);
