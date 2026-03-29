"use client";

import React from "react";
import { useTransactionsStore } from "@/src/store/useTransactionStore";
import { useDateFilter } from "@/src/hooks/useDataFilter";
import { Transaction } from "@/src/models/transactions.model";

const TransactionsTable: React.FC = () => {
  const { transactions, loading } = useTransactionsStore();

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filteredData,
    clearFilters,
  } = useDateFilter<Transaction>(transactions, "transaction_date");

  const tabs = ["Movimientos", "Estado", "Detalle", "Fondo no Disponible"];

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-black mb-6">Mis Transacciones</h2>

      {/* BARRA DE NAVEGACIÓN */}
      <div className="flex border-b border-gray-100 mb-6 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`px-6 py-3 text-sm font-bold whitespace-nowrap transition-colors ${
              index === 0
                ? "text-[#006341] border-b-2 border-[#006341] bg-emerald-50/30"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SECCIÓN DE FILTROS */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-[10px] font-black mb-1 text-gray-400 uppercase tracking-widest">
            Desde:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm outline-none bg-gray-50 text-gray-700"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] font-black mb-1 text-gray-400 uppercase tracking-widest">
            Hasta:
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm outline-none bg-gray-50 text-gray-700"
          />
        </div>
        <button
          onClick={clearFilters}
          className="bg-[#4d8c73] hover:bg-[#006341] text-white px-8 py-2 rounded-md font-bold text-sm transition-all shadow-sm active:scale-95"
        >
          Limpiar
        </button>
      </div>

      {/* TABLA DE TRANSACCIONES */}
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
              filteredData.map((tx: Transaction, index) => {
                const dateObj = new Date(tx.transaction_date);
                const isDebit = tx.transaction_type?.toLowerCase() === "debit";

                return (
                  <tr key={`${tx.transaction_number}-${index}`}>
                    <td className="p-4 text-sm text-gray-500 font-medium">
                      {dateObj.toLocaleDateString("es-NI")}
                    </td>
                    <td className="p-4 text-sm text-gray-800 font-bold">
                      {tx.description}
                    </td>
                    <td
                      className={`p-4 text-sm font-black text-center ${isDebit ? "text-red-500" : "text-[#006341]"}`}
                    >
                      {isDebit ? "- " : "+ "}
                      {tx.amount.value.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                      <span className="ml-1 text-[10px] opacity-70">
                        {tx.amount.currency}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="bg-emerald-50 text-[#006341] px-3 py-1 rounded-full text-[10px] font-black tracking-tighter border border-emerald-100 shadow-sm">
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
                  className="p-16 text-center text-gray-400 italic font-medium"
                >
                  No hay movimientos.
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
