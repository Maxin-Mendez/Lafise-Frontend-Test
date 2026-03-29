"use client";

import { useState } from "react";
import { Eye, EyeOff, Copy, AlertCircle, RefreshCw } from "lucide-react";
import { useAccountStore } from "@/src/store/useAccountStore";
import { AccountStateItem } from "@/src/models/accounts.model";

const Accounts = () => {
  const { accounts, loading, error, clearError } = useAccountStore();
  const [showBalances, setShowBalances] = useState(false);

  const getFlag = (currency: string) => {
    return currency === "NIO" ? (
      <img src="/NIO.png" className="w-8 h-8 rounded-full object-cover" />
    ) : (
      <img src="/usa.png" className="w-8 h-8 rounded-full object-cover" />
    );
  };

  // ESTADO DE CARGA
  if (loading && accounts.length === 0) {
    return (
      <div className="w-full">
        <div className="h-8 w-32 bg-gray-100 animate-pulse rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 bg-gray-50 animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // ESTADO DE ERROR
  if (error && accounts.length === 0) {
    return (
      <div className="w-full p-10 bg-red-50/50 border border-red-100 rounded-2xl text-center shadow-sm">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertCircle className="text-red-600" size={32} />
          </div>
        </div>
        <h3 className="text-lg font-bold text-red-900 mb-2">
          Error al cargar tarjetas
        </h3>
        <p className="text-red-700/70 text-sm max-w-xs mx-auto mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-red-200"
        >
          <RefreshCw size={16} />
          Reintentar conexión
        </button>
      </div>
    );
  }

  // RENDER NORMAL
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Cuentas</h2>
        <button
          onClick={() => setShowBalances(!showBalances)}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors outline-none"
        >
          {showBalances ? <EyeOff size={18} /> : <Eye size={18} />}
          <span className="text-xs font-semibold uppercase tracking-wider">
            {showBalances ? "Ocultar" : "Mostrar"}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc: AccountStateItem) => (
          <div
            key={acc.account_id}
            className="bg-white rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all relative group"
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-bold text-gray-800">
                {acc.currency} {acc.type || "Cuenta"}
              </h3>
              <div className="text-3xl filter drop-shadow-sm">
                {getFlag(acc.currency)}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="bg-emerald-50/50 px-2 py-0.5 rounded flex items-center gap-2">
                <span className="text-[12px] font-bold text-emerald-800/60 tracking-tight font-mono">
                  {acc.account_number}
                </span>
                <button
                  className="text-emerald-800/40 hover:text-emerald-800 transition-colors"
                  onClick={() =>
                    navigator.clipboard.writeText(acc.account_number)
                  }
                >
                  <Copy size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="mt-auto">
              <p className="text-xl font-bold text-gray-800 tracking-tight font-mono">
                {acc.currency === "NIO" ? "C$" : "USD"}{" "}
                {showBalances
                  ? acc.balance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "••••••"}
              </p>
            </div>
          </div>
        ))}

        {/* Estado vacío */}
        {!loading && !error && accounts.length === 0 && (
          <div className="col-span-full p-10 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
            No se encontraron cuentas activas.
          </div>
        )}
      </div>
    </div>
  );
};

export default Accounts;
