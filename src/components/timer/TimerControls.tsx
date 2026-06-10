'use client';

import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function TimerControls({
  onStart,
  onPause,
  onReset,
}: Props) {
  return (
    <div className="flex gap-4">
      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={onStart}
        className="
          rounded-xl
          bg-green-600
          px-6
          py-3
          font-semibold
          text-white
          shadow-lg
          transition-colors
          hover:bg-green-500
          cursor-pointer
        "
      >
        ▶ Start
      </motion.button>

      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={onPause}
        className="
          rounded-xl
          bg-yellow-600
          px-6
          py-3
          font-semibold
          text-white
          shadow-lg
          transition-colors
          hover:bg-yellow-500
          cursor-pointer
        "
      >
        ⏸ Pause
      </motion.button>

      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={onReset}
        className="
          rounded-xl
          bg-red-600
          px-6
          py-3
          font-semibold
          text-white
          shadow-lg
          transition-colors
          hover:bg-red-500
          cursor-pointer
        "
      >
        ↺ Reset
      </motion.button>
    </div>
  );
}