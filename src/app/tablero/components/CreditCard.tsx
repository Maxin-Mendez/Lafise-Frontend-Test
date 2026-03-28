"use client";

import Image from "next/image";
import { useUserStore } from "@/src/store/useUserStore";

// Definicion de la interfaz para los datos visuales de la tarjeta
interface TarjetaVisual {
  account_number: string | number;
  expire_date: string;
  gradientFrom: string;
  gradientTo: string;
}

interface CreditCardProps {
  tarjetas: TarjetaVisual[];
}

export default function CreditCard({ tarjetas }: CreditCardProps) {
  // Traer datos del usuario (ya tipado como User | null)
  const { user } = useUserStore();

  return (
    <div className="flex flex-wrap gap-5 mt-4">
      {tarjetas.map((t, index) => {
        // Convercion del número a string y aseguramos que tenga 16 dígitos (rellenando con 0 si hace falta)
        const fullNumber = t.account_number.toString().padStart(16, "0");

        return (
          <div
            key={`${fullNumber}-${index}`}
            className="relative w-80 h-[208.4px] rounded-[10px] overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
            style={{
              background: `linear-gradient(to right, ${t.gradientFrom}, ${t.gradientTo})`,
            }}
          >
            {/* Logo Bancario */}
            <div className="absolute top-5 left-5">
              <Image
                src="/logo2.png"
                alt="Logo"
                width={86}
                height={28}
                className="object-contain brightness-0 invert"
              />
            </div>

            {/* Números de la Tarjeta (Separados por bloques de 4) */}
            <div className="absolute top-[55%] left-5 right-5 flex justify-between text-white text-xl font-mono tracking-wider drop-shadow-md">
              <span>{fullNumber.slice(0, 4)}</span>
              <span>{fullNumber.slice(4, 8)}</span>
              <span>{fullNumber.slice(8, 12)}</span>
              <span>{fullNumber.slice(12, 16)}</span>
            </div>

            {/* Nombre del Titular */}
            <div className="absolute bottom-5 left-5 text-white">
              <p className="text-[10px] uppercase opacity-70 mb-0.5">
                Card Holder
              </p>
              <p className="text-sm font-bold uppercase tracking-wide">
                {user?.full_name || "Cargando..."}
              </p>
            </div>

            {/* Fecha de Expiración */}
            <div className="absolute bottom-5 right-5 text-white text-right">
              <p className="text-[10px] uppercase opacity-70 mb-0.5">
                Expires date
              </p>
              <p className="text-sm font-bold">{t.expire_date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
