"use client";

import React from "react";
import { useAccountStore } from "@/src/store/useAccountStore";
import { AccountStateItem } from "@/src/models/accounts.model";

interface TransferFormData {
  origin: string;
  destination: string;
  reference: string;
  confirmation: string;
  amount: {
    value: number;
    currency: string;
  };
}

interface Props {
  currentStep: number;
  formData: TransferFormData;
  updateFields: (fields: Partial<TransferFormData>) => void;
  updateAmount: (fields: Partial<TransferFormData["amount"]>) => void;
}

export const TransferForm: React.FC<Props> = ({
  currentStep,
  formData,
  updateFields,
  updateAmount,
}) => {
  const accounts = useAccountStore((state) => state.accounts);

  const inputStyles =
    "border border-gray-200 rounded-lg p-3 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#006341] transition-all text-gray-700 shadow-sm";
  const labelStyles =
    "text-[11px] font-black text-[#004d33] uppercase tracking-wider mb-1 flex items-center gap-2";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-gray-100 pt-10 text-black">
      {/* CUENTA ORIGEN */}
      {currentStep >= 1 && (
        <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500">
          <label className={labelStyles}>
            <span className="bg-[#004d33] text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] not-italic">
              1
            </span>
            Cuenta origen
          </label>
          <select
            value={formData.origin}
            onChange={(e) => updateFields({ origin: e.target.value })}
            className={inputStyles}
          >
            <option value="">Seleccione cuenta de cargo</option>
            {accounts.map((acc: AccountStateItem) => (
              <option key={acc.account_number} value={acc.account_number}>
                {acc.type} - {acc.account_number} ({acc.currency}{" "}
                {acc.balance.toLocaleString()})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* CUENTA DESTINO */}
      {currentStep >= 2 && (
        <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500">
          <label className={labelStyles}>
            <span className="bg-[#004d33] text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] not-italic">
              2
            </span>
            Cuenta destino
          </label>
          <select
            value={formData.destination}
            onChange={(e) => updateFields({ destination: e.target.value })}
            className={inputStyles}
          >
            <option value="">Seleccione cuenta destino</option>
            {/* Validación */}
            {accounts.map((acc: AccountStateItem) => (
              <option
                key={acc.account_number}
                value={acc.account_number}
                disabled={acc.account_number === formData.origin}
              >
                {acc.type} - {acc.account_number}{" "}
                {acc.account_number === formData.origin ? "(Misma cuenta)" : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* MONEDA */}
      {currentStep >= 3 && (
        <div className="flex flex-col animate-in fade-in duration-500">
          <label className={labelStyles}>
            <span className="bg-[#004d33] text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] not-italic">
              3
            </span>
            Moneda
          </label>
          <select
            value={formData.amount.currency}
            onChange={(e) => updateAmount({ currency: e.target.value })}
            className={inputStyles}
          >
            <option value="NIO">Córdobas (NIO)</option>
          </select>
        </div>
      )}

      {/* DATOS ADICIONALES */}
      {currentStep >= 4 && (
        <>
          <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500">
            <label className={labelStyles}>
              <span className="bg-[#004d33] text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] not-italic">
                4
              </span>
              Monto a transferir
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">
                {formData.amount.currency}
              </span>
              <input
                type="number"
                min="1"
                value={formData.amount.value || ""}
                onChange={(e) =>
                  updateAmount({ value: Number(e.target.value) })
                }
                placeholder="0.00"
                className={`${inputStyles} w-full pl-12 bg-white font-bold text-emerald-700`}
              />
            </div>
          </div>

          <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-700">
            <label className={labelStyles}>
              <span className="bg-[#004d33] text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] not-italic">
                5
              </span>
              Concepto / Referencia
            </label>
            <input
              type="text"
              maxLength={50}
              value={formData.reference}
              onChange={(e) => updateFields({ reference: e.target.value })}
              placeholder="Ej: Pago de servicios"
              className={`${inputStyles} bg-white`}
            />
          </div>

          <div className="flex flex-col md:col-span-2 animate-in fade-in slide-in-from-bottom-2 duration-1000">
            <label className={labelStyles}>
              <span className="bg-[#004d33] text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] not-italic">
                6
              </span>
              Email para confirmación (Opcional)
            </label>
            <input
              type="email"
              value={formData.confirmation}
              onChange={(e) => updateFields({ confirmation: e.target.value })}
              placeholder="correo@ejemplo.com"
              className={`${inputStyles} bg-white`}
            />
          </div>
        </>
      )}
    </div>
  );
};
