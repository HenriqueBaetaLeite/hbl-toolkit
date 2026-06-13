'use client';

import { ReactNode } from 'react';

interface ConfigModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function ConfigModal({
  title,
  open,
  onClose,
  children,
}: ConfigModalProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-slate-700
          bg-slate-900
          p-6
          shadow-2xl
        "
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              text-xl
              text-slate-400
              transition
              hover:text-white
            "
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}