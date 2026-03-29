"use client";

import React from "react";
import { CheckIcon } from "@/src/components/Icons/Icons";

interface Props {
  currentStep: number;
}

const STEPS = [
  { id: 1, label: "CUENTA ORIGEN" },
  { id: 2, label: "CUENTA DESTINO" },
  { id: 3, label: "MONEDA" },
  { id: 4, label: "DATOS ADICIONALES" },
];

export const TransferStepper: React.FC<Props> = ({ currentStep }) => {
  const progressWidth = Math.min(
    ((currentStep - 1) / (STEPS.length - 1)) * 100,
    100,
  );

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-16 select-none">
      {/* LÍNEA DE PROGRESO */}
      <div className="absolute top-5 left-0 right-0 px-10 md:px-20">
        <div className="h-[2px] bg-gray-100 w-full relative overflow-hidden rounded-full">
          <div
            className="absolute h-full bg-[#006341] transition-all duration-700 ease-in-out shadow-[0_0_8px_rgba(0,99,65,0.4)]"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>

      {/* HITOS */}
      <div className="relative z-10 flex justify-between">
        {STEPS.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isPending = currentStep < step.id;

          return (
            <div key={step.id} className="flex flex-col items-center group">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 
                  transition-all duration-500 ease-out shadow-sm
                  ${
                    isCompleted
                      ? "bg-[#006341] border-[#006341] text-white scale-105"
                      : isActive
                        ? "bg-white border-[#006341] text-[#006341] ring-4 ring-emerald-50"
                        : "bg-white border-gray-200 text-gray-300"
                  }
                `}
              >
                {isCompleted ? (
                  <CheckIcon
                    className="w-5 h-5 animate-in zoom-in duration-300"
                    strokeWidth={3.5}
                  />
                ) : (
                  <span
                    className={`text-sm font-black ${isActive ? "animate-pulse" : ""}`}
                  >
                    {step.id}
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-col items-center gap-1">
                <span
                  className={`text-[8px] font-black tracking-[0.2em] transition-colors duration-500 
                    ${!isPending ? "text-[#006341]" : "text-gray-300"}`}
                >
                  PASO {step.id}
                </span>
                <span
                  className={`text-[9px] font-bold text-center w-20 md:w-28 leading-tight transition-colors duration-500 
                    ${!isPending ? "text-black" : "text-gray-300"}`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
