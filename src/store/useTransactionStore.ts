import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetchTransactions } from "@/src/services/getAccountsTransactions";
import { Transaction, TransactionResponse } from "../models/transactions.model";

// Definir la interfaz del estado del Store
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

      // El middleware 'persist' ya se encarga de cargar los datos del storage
      // automáticamente al iniciar la aplicación

      fetchTransactionsByAccount: async (accounts_numbers) => {
        if (!accounts_numbers || accounts_numbers.length === 0) return;

        set({ loading: true, error: null });

        try {
          // Llamada en paralelo a la API para todas las cuentas enviadas
          const responses = await Promise.all(
            accounts_numbers.map((account) => fetchTransactions(account)),
          );

          // Extraer todos los items de las respuestas de la API
          const serverTransactions = responses.flatMap(
            (res: TransactionResponse) => res.items || [],
          );

          set((state) => {
            const currentTransactions = state.transactions;

            // Se usa un Set de IDs para filtrar duplicados de forma eficiente
            const serverIds = new Set(
              serverTransactions.map((tx) => tx.transaction_number),
            );

            // Mantener las transacciones que están en el estado local pero que
            // aún no aparecen en la respuesta del servidor
            const localOnly = currentTransactions.filter(
              (tx) => !serverIds.has(tx.transaction_number),
            );

            // Combinar locales nuevas con las del servidor y ordenamos por fecha descendente
            const combined = [...localOnly, ...serverTransactions].sort(
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
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));
      },
    }),
    {
      name: LOCAL_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Solo persistimos el array de transacciones.
      // Evitamos guardar estados temporales como 'loading' o 'error'.
      partialize: (state) => ({ transactions: state.transactions }),
    },
  ),
);
