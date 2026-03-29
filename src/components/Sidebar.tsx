"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowRightLeft,
  Banknote,
  Users,
  Settings,
  CreditCard,
  MonitorSmartphone,
  Briefcase,
  PiggyBank,
  ChevronRight,
} from "lucide-react";

const MENU_ITEMS = [
  { title: "Tablero", href: "/tablero", icon: LayoutDashboard },
  { title: "Transferir", href: "/transferir", icon: ArrowRightLeft },
  { title: "Pagar", href: "/pagar", icon: Banknote },
  { title: "Mis transacciones", href: "/transacciones", icon: Users },
  { title: "Cheques", href: "/cheques", icon: CreditCard },
  { title: "Paganet", href: "/paganet", icon: MonitorSmartphone },
  { title: "Administrar", href: "/administrar", icon: Briefcase },
  { title: "Ahorro automático", href: "/ahorro", icon: PiggyBank },
  { title: "Configuración", href: "/configuracion", icon: Settings },
] as const;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-72 h-screen px-4 py-6 bg-[#F8FBFA] border-r border-gray-200 overflow-y-auto scrollbar-hide">
      {/* Logo */}
      <div className="flex items-center justify-center mb-10">
        <div className="relative w-[190px] h-[56px]">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhmzVeYrspoKWFIoYLjhpNMIn96QsVPUgk4Q&s"
            alt="Logo Lafise"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between px-4 py-3 text-[14px] transition-all duration-200 ${
                isActive
                  ? "text-[#006341] font-bold"
                  : "text-slate-900 hover:text-[#006341] font-semibold"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? "text-[#006341]"
                      : "text-slate-600 group-hover:text-[#006341]"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span>{item.title}</span>
              </div>
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  isActive
                    ? "text-[#006341] translate-x-1"
                    : "text-slate-300 group-hover:text-[#006341]"
                }`}
                strokeWidth={3}
              />
            </Link>
          );
        })}
      </nav>

      {/* Tasa de Cambio */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">
          Tasa de cambio
        </h3>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex gap-2 mb-4">
            <select className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 text-[11px] font-bold rounded-lg px-2 py-2 focus:ring-1 focus:ring-[#006341] outline-none cursor-pointer">
              <option>NIO</option>
            </select>
            <select className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 text-[11px] font-bold rounded-lg px-2 py-2 focus:ring-1 focus:ring-[#006341] outline-none cursor-pointer">
              <option>USD</option>
            </select>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase">
                Compra
              </span>
              <span className="text-sm font-black text-slate-900">36.60</span>
            </div>

            <div className="bg-[#006341] p-2 rounded-full text-white">
              <ArrowRightLeft className="w-3 h-3" strokeWidth={3} />
            </div>

            <div className="flex flex-col text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase">
                Venta
              </span>
              <span className="text-sm font-black text-slate-900">36.95</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100 space-y-2 px-1">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">
            Sesión segura
          </span>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.4)]"></div>
        </div>
        <div className="space-y-0.5">
          <p className="text-[10px] text-slate-500 font-medium">
            IP:{" "}
            <span className="text-slate-900 font-bold font-mono">
              190.43.57.23
            </span>
          </p>
          <p className="text-[10px] text-slate-500 font-medium">
            Acceso:{" "}
            <span className="text-slate-900 font-bold">
              {new Date().toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>
    </aside>
  );
}
