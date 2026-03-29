"use client";

import React from "react";
import { usePageData } from "@/src/hooks/usePageData";
import { useTransfer } from "@/src/hooks/useTransfer";
import { TransferStepper } from "./components/TransferStepper";
import { TransferForm } from "./components/TransferForm";
import { TransferStatus } from "./components/TransferStatus";

export default function TransferirPage() {
  const { isClient, loading: loadingData } = usePageData();

  const {
    currentStep,
    formData,
    loading: transferring,
    error,
    success,
    updateFields,
    updateAmount,
    nextStep,
    prevStep,
    executeTransfer,
    isFirstStep,
    isLastStep,
    isFormComplete,
  } = useTransfer();

  if (!isClient) return null;

  const handleAction = async () => {
    if (isLastStep) {
      await executeTransfer();
    } else {
      nextStep();
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] p-4 md:p-10">
      <TransferStatus success={success} error={error} />

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        {/* Encabezado de Página */}
        <header className="mb-12">
          <h1 className="text-2xl font-black text-[#004d33] italic uppercase tracking-widest flex items-center gap-3">
            <span className="w-8 h-1 bg-[#004d33] block"></span>
            Transferir
          </h1>
          <p className="text-gray-400 text-xs font-medium uppercase mt-2 tracking-tighter">
            Realiza transferencias entre tus cuentas de forma segura e inmediata
          </p>
        </header>

        {/* Indicador de Progreso */}
        <TransferStepper currentStep={currentStep} />

        {/* Formulario */}
        <section className="mt-16 min-h-[300px]">
          {loadingData ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Sincronizando cuentas...
              </p>
            </div>
          ) : (
            <TransferForm
              currentStep={currentStep}
              formData={formData}
              updateFields={updateFields}
              updateAmount={updateAmount}
            />
          )}
        </section>

        {/* Acciones de Navegación */}
        <footer className="flex flex-col md:flex-row justify-center items-center gap-4 mt-16 border-t border-gray-50 pt-10">
          {!isFirstStep && !transferring && (
            <button
              onClick={prevStep}
              className="w-full md:w-auto px-12 py-3 border-2 border-[#004d33] text-[#004d33] rounded-lg font-black text-[11px] uppercase italic hover:bg-emerald-50 transition-all active:scale-95"
            >
              Regresar
            </button>
          )}

          <button
            onClick={handleAction}
            disabled={
              transferring || (isLastStep && !isFormComplete) || loadingData
            }
            className={`
              w-full md:w-auto px-16 py-3.5 text-white rounded-lg font-black text-[11px] 
              transition-all shadow-lg shadow-emerald-900/10 uppercase italic active:scale-95
              ${
                transferring || (isLastStep && !isFormComplete) || loadingData
                  ? "bg-gray-300 cursor-not-allowed shadow-none"
                  : "bg-[#004d33] hover:bg-[#003d28]"
              }
            `}
          >
            {transferring ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Procesando
              </span>
            ) : isLastStep ? (
              "Confirmar y Enviar"
            ) : (
              "Siguiente Paso"
            )}
          </button>
        </footer>
      </div>
    </main>
  );
}
