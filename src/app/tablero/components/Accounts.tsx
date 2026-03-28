"use client";

import { useState } from "react";
import { Eye, EyeOff, MoreVertical } from "lucide-react";
import { useAccountStore } from "@/src/store/useAccountStore";
import { AccountStateItem } from "@/src/models/accounts.model";

const Accounts = () => {
  // Extraer estados del store con tipado automático
  const { accounts, loading } = useAccountStore();
  const [showBalances, setShowBalances] = useState(false);

  // Esqueleto de carga (Skeleton) mejorado para evitar saltos visuales
  if (loading && accounts.length === 0) {
    return (
      <div className="w-full">
        <div className="h-8 w-32 bg-gray-200 animate-pulse rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-40 bg-gray-100 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black italic">Mis Cuentas:</h2>
        <button
          onClick={() => setShowBalances(!showBalances)}
          className="flex items-center gap-2 text-gray-500 hover:text-emerald-700 transition-colors outline-none"
          aria-label={showBalances ? "Ocultar saldos" : "Mostrar saldos"}
        >
          {showBalances ? <EyeOff size={20} /> : <Eye size={20} />}
          <span className="text-sm font-medium">
            {showBalances ? "Ocultar" : "Mostrar"} saldos
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Iteración segura de las cuentas del store */}
        {accounts.map((acc: AccountStateItem) => (
          <div
            key={acc.account_id}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            {/* Indicador lateral con color corporativo */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#006341]"></div>

            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {acc.type}
                </p>
                <p className="text-sm font-bold text-gray-700 font-mono">
                  {acc.account_number}
                </p>
              </div>
              <button className="text-gray-300 hover:text-gray-600 transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="mt-4">
              <p className="text-[11px] text-gray-500 font-medium">
                Saldo disponible
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-[#006341]">
                  {acc.currency}
                </span>
                <span className="text-2xl font-black text-gray-900 tracking-tight">
                  {showBalances
                    ? acc.balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "••••••"}
                </span>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-black tracking-tighter uppercase">
                Activa
              </span>
            </div>
          </div>
        ))}

        {/* Estado vacío cuando no hay datos */}
        {!loading && accounts.length === 0 && (
          <div className="col-span-full p-10 border-2 border-dashed border-gray-100 rounded-xl text-center">
            <p className="text-gray-400 font-medium">
              No se encontraron cuentas vinculadas a este perfil.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accounts;
