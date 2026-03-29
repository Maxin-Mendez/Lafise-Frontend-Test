"use client";

import CreditCard from "./components/CreditCard";
import Accounts from "./components/Accounts";
import TransactionsTable from "./components/TransactionsTable";
import { usePageData } from "@/src/hooks/usePageData";
import { AccountStateItem } from "@/src/models/accounts.model";

export default function Tablero() {
  const { accounts, isClient, loading } = usePageData();

  if (!isClient) return null;

  const tarjetasDinamicas = accounts.map(
    (acc: AccountStateItem, index: number) => {
      const colorSchemes = [
        { from: "#004d33", to: "#006341" }, // Verde
        { from: "#1a1a2e", to: "#16213e" }, // Azul
        { from: "#2c2c2c", to: "#000000" }, // Negro
      ];

      const scheme = colorSchemes[index % colorSchemes.length];

      return {
        account_number: acc.account_number,
        expire_date: "12/28",
        gradientFrom: scheme.from,
        gradientTo: scheme.to,
      };
    },
  );

  return (
    <div className="bg-white min-h-screen p-4 md:p-8">
      {/* SECCIÓN MIS TARJETAS */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-black mb-4 italic">
          Mis tarjetas
        </h2>

        {loading && accounts.length === 0 ? (
          <div className="flex gap-5 overflow-hidden">
            <div className="w-80 h-[208.4px] bg-gray-100 rounded-[10px] animate-pulse flex items-center justify-center text-gray-300 font-medium">
              Cargando tarjetas...
            </div>
            <div className="w-80 h-[208.4px] bg-gray-50 rounded-[10px] animate-pulse hidden md:block"></div>
          </div>
        ) : tarjetasDinamicas.length > 0 ? (
          <CreditCard tarjetas={tarjetasDinamicas} />
        ) : (
          <div className="p-10 border-2 border-dashed border-gray-100 rounded-xl text-center text-gray-400">
            No hay tarjetas disponibles para mostrar.
          </div>
        )}
      </section>

      {/* SECCIÓN CUENTAS */}
      <section className="mb-10">
        <Accounts />
      </section>

      {/* SECCIÓN TRANSACCIONES RECIENTES*/}
      <section>
        <TransactionsTable />
      </section>
    </div>
  );
}
