"use client";

import React from "react";
import { Toast } from "@/src/components/ui/Toast";

interface TransferStatusProps {
  success: boolean;
  error: string | null;
}

export const TransferStatus: React.FC<TransferStatusProps> = ({
  success,
  error,
}) => {
  if (!success && !error) return null;

  return (
    <div className="fixed top-8 right-8 z-[100] flex flex-col gap-4 w-[340px] pointer-events-none">
      {success && (
        <Toast
          type="success"
          title="Transacción Exitosa"
          message="Los balances se han actualizado correctamente."
        />
      )}

      {error && <Toast type="error" title="Error en Proceso" message={error} />}
    </div>
  );
};
