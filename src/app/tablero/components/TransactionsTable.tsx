"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTransactionsStore } from "@/src/store/useTransactionStore";
import { useDateFilter } from "@/src/hooks/useDataFilter";
import { Transaction } from "@/src/models/transactions.model";

const TransactionsTable: React.FC = () => {
  const router = useRouter();
  const { transactions, loading } = useTransactionsStore();

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filteredData,
    clearFilters,
  } = useDateFilter<Transaction>(transactions, "transaction_date");

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-black italic">
          Transacciones recientes
        </h2>
        <button
          onClick={() => router.push("/transacciones")}
          className="text-gray-500 hover:text-emerald-700 text-sm font-medium transition-colors"
        >
          Ver todas
        </button>
      </div>

      {/* Filtros de Fecha */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div className="flex flex-col text-black">
          <label className="text-[10px] font-black mb-1 text-gray-400 uppercase tracking-widest">
            Desde:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm outline-none bg-gray-50 text-gray-700 font-mono"
          />
        </div>
        <div className="flex flex-col text-black">
          <label className="text-[10px] font-black mb-1 text-gray-400 uppercase tracking-widest">
            Hasta:
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm outline-none bg-gray-50 text-gray-700 font-mono"
          />
        </div>
        <button
          onClick={clearFilters}
          className="bg-[#4d8c73] hover:bg-[#006341] text-white px-8 py-2 rounded-md font-bold text-sm transition-all shadow-sm active:scale-95"
        >
          Limpiar
        </button>
      </div>

      {/* Tabla de Transacciones */}
      <div className="overflow-x-auto border border-gray-100 rounded-lg shadow-sm">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-[#f8f9fa] text-gray-500">
              <th className="p-4 text-[10px] font-black uppercase border-b tracking-wider">
                Fecha
              </th>
              <th className="p-4 text-[10px] font-black uppercase border-b tracking-wider">
                Descripción
              </th>
              <th className="p-4 text-[10px] font-black uppercase border-b text-center tracking-wider">
                Monto
              </th>
              <th className="p-4 text-[10px] font-black uppercase border-b text-center tracking-wider">
                Origen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading && filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-10 text-center text-gray-400 animate-pulse font-medium"
                >
                  Cargando...
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.slice(0, 3).map((tx: Transaction) => {
                const dateObj = new Date(tx.transaction_date);
                const isDebit = tx.transaction_type?.toLowerCase() === "debit";

                return (
                  <tr key={tx.transaction_number} className="transition-colors">
                    <td className="p-4 text-sm text-gray-500 font-medium font-mono">
                      {dateObj.toLocaleDateString("es-NI")}
                    </td>
                    <td className="p-4 text-sm text-gray-800 font-bold">
                      {tx.description}
                    </td>
                    <td
                      className={`p-4 text-sm font-black text-center font-mono ${isDebit ? "text-red-500" : "text-[#006341]"}`}
                    >
                      {isDebit ? "- " : "+ "}
                      {tx.amount.value.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                      <span className="ml-1 text-[10px] opacity-70 font-sans">
                        {tx.amount.currency}
                      </span>
                    </td>

                    {/* ORIGEN: Resaltado con fuente MONO para parecer número de cuenta real */}
                    <td className="p-4 text-center">
                      <span className="bg-emerald-50 text-[#006341] px-3 py-1 rounded-full text-[10px] font-black tracking-tighter border border-emerald-100 font-mono shadow-sm">
                        {tx.origin}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-16 text-center text-gray-400 italic"
                >
                  No hay transacciones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionsTable;
