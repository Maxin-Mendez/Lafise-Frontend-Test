import { useEffect, useState, useMemo } from "react";
import { useUserStore } from "@/src/store/useUserStore";
import { useAccountStore } from "@/src/store/useAccountStore";
import { useTransactionsStore } from "@/src/store/useTransactionStore";

export function usePageData() {
  const [isClient, setIsClient] = useState(false);

  const { user, fetchUser, loading: loadingUser } = useUserStore();
  const {
    accounts,
    fetchAccountsByIds,
    loading: loadingAccounts,
  } = useAccountStore();
  const { fetchTransactionsByAccount, loading: loadingTx } =
    useTransactionsStore();

  useEffect(() => {
    setIsClient(true);
    fetchUser(1);
  }, [fetchUser]);

  useEffect(() => {
    if (user?.products && user.products.length > 0) {
      const ids = user.products.map((p) => p.id);
      fetchAccountsByIds(ids);
    }
  }, [user, fetchAccountsByIds]);

  // Sincronización de transacciones
  const accountNumbers = useMemo(
    () => accounts.map((a) => a.account_number),
    [accounts],
  );

  useEffect(() => {
    if (accountNumbers.length > 0) {
      fetchTransactionsByAccount(accountNumbers);
    }
  }, [accountNumbers, fetchTransactionsByAccount]);

  return {
    user,
    accounts,
    isClient,
    loading: loadingUser || loadingAccounts || loadingTx,
  };
}
