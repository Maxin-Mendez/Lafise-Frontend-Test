"use client";

import { Menu, Search, Bell } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-gray-100 shrink-0 sticky top-0 z-10 shadow-sm">
      {/* Botón de Menú (Izquierda) */}
      <div className="flex items-center">
        <button
          aria-label="Abrir menú"
          className="p-2 text-slate-800 hover:bg-slate-50 rounded-lg transition-all active:scale-95 group"
        >
          <Menu
            className="w-6 h-6 group-hover:text-[#006341]"
            strokeWidth={2.5}
          />
        </button>
      </div>

      {/* Controles de la Derecha */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Notificaciones */}
        <button
          aria-label="Notificaciones"
          className="p-2.5 text-slate-600 hover:bg-emerald-50 hover:text-[#006341] rounded-full transition-all relative group"
        >
          <Bell
            className="w-5 h-5 group-hover:animate-ring"
            strokeWidth={2.5}
          />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full shadow-sm"></span>
        </button>

        {/* Barra de Búsqueda */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" strokeWidth={3} />
          </div>
          <input
            type="text"
            placeholder="Buscar transacciones..."
            className="w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#006341] focus:ring-1 focus:ring-[#006341] transition-all"
          />
        </div>

        {/* Línea divisoria visual */}
        <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>

        {/* Perfil de Usuario */}
        <div className="flex items-center gap-3 pl-2">
          <button className="relative group focus:outline-none">
            <div className="w-9 h-9 relative rounded-full border-2 border-slate-200 group-hover:border-[#006341] transition-all overflow-hidden bg-slate-100">
              <Image
                src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                alt="Perfil de usuario"
                fill
                sizes="36px"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            {/* Estado Online */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
          </button>
        </div>
      </div>
    </header>
  );
}
