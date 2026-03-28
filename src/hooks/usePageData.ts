import { useEffect, useState, useMemo } from "react";
import { useUserStore } from "@/src/store/useUserStore";
import { useAccountStore } from "@/src/store/useAccountStore";
import { useTransactionsStore } from "@/src/store/useTransactionStore";

export function usePageData() {
  const [isClient, setIsClient] = useState(false);

  // Consumimos los stores
  const { user, fetchUser, loading: loadingUser } = useUserStore();
  const {
    accounts,
    fetchAccountsByIds,
    loading: loadingAccounts,
  } = useAccountStore();
  const { fetchTransactionsByAccount, loading: loadingTx } =
    useTransactionsStore();

  // Control de hidratación para Next.js
  useEffect(() => {
    setIsClient(true);
    // Disparamos la carga inicial del usuario 1
    fetchUser(1);
  }, [fetchUser]);

  // Cuando el usuario carga, pedimos sus cuentas
  useEffect(() => {
    if (user?.products && user.products.length > 0) {
      const ids = user.products.map((p) => p.id);
      fetchAccountsByIds(ids);
    }
  }, [user, fetchAccountsByIds]);

  // Sincronización de transacciones
  // Se usa useMemo para que la dependencia del useEffect sea estable y no entre en bucle
  const accountNumbers = useMemo(
    () => accounts.map((a) => a.account_number),
    [accounts],
  );

  useEffect(() => {
    if (accountNumbers.length > 0) {
      // Dispara la carga de transacciones para todas las cuentas del usuario
      fetchTransactionsByAccount(accountNumbers);
    }
  }, [accountNumbers, fetchTransactionsByAccount]);

  return {
    user,
    accounts,
    isClient,
    // Se agrega un estado de carga global por si el Tablero lo necesita
    loading: loadingUser || loadingAccounts || loadingTx,
  };
}
