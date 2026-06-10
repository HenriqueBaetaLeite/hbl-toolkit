"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  title: string;
  time: string;
  workout?: string;
  status?: string;
  progress: number;
  color?: string;
}

export function TimerDisplay({
  title,
  time,
  workout,
  status,
  progress,
  color = "#3b82f6",
}: Props) {
  const sessionFinished = status === "finished";

  return (
    <div
      className="
        w-full
        rounded-3xl
        border
        border-slate-800
        bg-slate-900
        p-8
        shadow-2xl
      "
    >
      {workout && (
        <p
          className="
            text-center
            text-sm
            font-semibold
            uppercase
            tracking-widest
            text-slate-400
          "
        >
          {workout}
        </p>
      )}

      {sessionFinished ? (
        <motion.div
          className="py-12 text-center"
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div className="text-6xl">🎉</div>

          <h2
            className="
              mt-4
              text-4xl
              font-black
            "
          >
            {workout} Finalizado
          </h2>

          <p className="mt-2 text-slate-400">Excelente trabalho!</p>
        </motion.div>
      ) : (
        <>
          <div
            className="
              mx-auto
              mt-6
              h-72
              w-72
              md:h-96
              md:w-96
            "
          >
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <CircularProgressbar
                value={progress * 100}
                text={time}
                styles={buildStyles({
                  textColor: color,
                  pathColor: color,
                  trailColor: "#1e293b",
                })}
              />
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.h2
              key={title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
              }}
              className="mt-8 text-center text-3xl font-bold"
            >
              {title}
            </motion.h2>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
