"use client";

import React from "react";
import { CheckIcon, ErrorIcon } from "../Icons/Icons";

interface ToastProps {
  type: "success" | "error";
  title: string;
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ type, title, message }) => {
  const isSuccess = type === "success";

  return (
    <div
      className={`
        bg-white border-l-[6px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5 rounded-r-xl 
        animate-in slide-in-from-right-full duration-500 ease-out flex items-start gap-4 
        pointer-events-auto border-y border-r border-gray-50
        ${isSuccess ? "border-emerald-500" : "border-red-500"}
      `}
    >
      <div
        className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
          ${isSuccess ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}
        `}
      >
        {isSuccess ? <CheckIcon /> : <ErrorIcon />}
      </div>

      <div className="flex flex-col gap-0.5 text-left">
        <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.15em] italic">
          {title}
        </h4>
        <p className="text-[10px] font-bold text-gray-400 uppercase leading-relaxed tracking-tight">
          {message}
        </p>
      </div>
    </div>
  );
};
