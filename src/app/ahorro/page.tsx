"use client";

import React from "react";

const PayHeader: React.FC = () => {
  return (
    <div className="mt-8 mb-8 flex items-center gap-4">
      {/* Línea horizontal verde a la izquierda, igual que en la imagen */}
      <div className="w-16 h-1 bg-[#006341] rounded-full"></div>

      {/* Texto "Ahorro Automatico" */}
      <h2 className="text-3xl font-bold italic text-[#006341] tracking-wider uppercase">
        Ahorro Automático
      </h2>
    </div>
  );
};

export default PayHeader;
