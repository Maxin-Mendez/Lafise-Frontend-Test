"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTransactionsStore } from "@/src/store/useTransactionStore";
import { useDateFilter } from "@/src/hooks/useDataFilter";
import { Transaction } from "@/src/models/transactions.model";

const TransactionsTable: React.FC = () => {
  const router = useRouter();

  // El store ya está tipado
  const { transactions, loading } = useTransactionsStore();

  // Aplica el hook de filtrado tipado con la interfaz del modelo
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
            className="border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-[#006341] outline-none bg-gray-50 text-gray-700"
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
            className="border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-[#006341] outline-none bg-gray-50 text-gray-700"
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
                Referencia
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading && filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-10 text-center text-gray-400 animate-pulse"
                >
                  Cargando transacciones...
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              // Mostramos solo las primeras 3 para el Dashboard
              filteredData.slice(0, 3).map((tx: Transaction) => {
                const dateObj = new Date(tx.transaction_date);
                const finalAmount = tx.amount?.value ?? 0;
                const isDebit = tx.transaction_type?.toLowerCase() === "debit";

                return (
                  <tr
                    key={tx.transaction_number}
                    className="hover:bg-emerald-50/30 transition-colors group"
                  >
                    <td className="p-4 text-sm text-gray-500 font-medium">
                      {dateObj.toLocaleDateString("es-NI")}
                    </td>
                    <td className="p-4 text-sm text-gray-800 font-bold group-hover:text-[#006341] transition-colors">
                      {tx.description}
                    </td>
                    <td
                      className={`p-4 text-sm font-black text-center ${
                        isDebit ? "text-red-500" : "text-[#006341]"
                      }`}
                    >
                      {isDebit ? "- " : "+ "}
                      {finalAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      <span className="text-[10px] opacity-70">
                        {tx.amount?.currency}
                      </span>
                    </td>
                    <td className="p-4 text-[11px] text-gray-400 text-center font-mono tracking-tighter">
                      {tx.transaction_number}
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
                  No se encontraron transacciones para este periodo.
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
