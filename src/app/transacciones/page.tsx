"use client";

import TransactionsTable from "./components/TransactionsTable";
import { usePageData } from "@/src/hooks/usePageData";

export default function TransaccionesPage() {
  // Cargamos la data necesaria (Cuentas y Transacciones)
  // Aunque estemos en la página de transacciones, necesitamos usePageData
  // para asegurar que los stores estén sincronizados con el usuario actual.
  const { isClient, loading, user } = usePageData();

  // Evitar desajustes de hidratación en Next.js
  if (!isClient) return null;

  return (
    <div className="bg-[#fcfcfc] min-h-screen p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado Principal de la Página */}
        <header className="mb-8 border-b border-gray-100 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-black tracking-tight">
                Historial de{" "}
                <span className="text-[#006341]">Transacciones</span>
              </h1>
              <p className="text-gray-400 text-sm font-medium mt-1">
                Consulta y filtra todos tus movimientos bancarios.
              </p>
            </div>

            {/* Badge con nombre de usuario para contexto */}
            <div className="bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 hidden md:block">
              <span className="text-[10px] uppercase font-black text-[#006341] tracking-widest">
                Usuario: {user?.full_name || "Cargando..."}
              </span>
            </div>
          </div>
        </header>

        {/* Contenedor Principal */}
        <main className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-1 md:p-4">
            {/* Inyectamos el componente de tabla. 
                Al estar en su propia página, la tabla ahora es la protagonista.
             */}
            <TransactionsTable />
          </div>
        </main>

        {/* Footer Informativo de la página */}
        <footer className="mt-6 text-center">
          <p className="text-[11px] text-gray-300 font-medium uppercase tracking-widest">
            Los datos mostrados corresponden a los últimos 12 meses de actividad
          </p>
        </footer>
      </div>
    </div>
  );
}
