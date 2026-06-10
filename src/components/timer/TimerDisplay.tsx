'use client';

import {
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

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
  color = '#3b82f6',
}: Props) {
  const sessionFinished =
    status === 'finished';

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
        <div className="py-12 text-center">
          <div className="text-6xl">
            🎉
          </div>

          <h2
            className="
              mt-4
              text-4xl
              font-black
            "
          >
            {workout} Finalizado
          </h2>

          <p className="mt-2 text-slate-400">
            Excelente trabalho!
          </p>
        </div>
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
            <CircularProgressbar
              value={progress * 100}
              text={time}
              styles={buildStyles({
                pathColor: color,
                trailColor: '#1e293b',
                textColor: '#ffffff',
                textSize: '16px',
              })}
            />
          </div>

          <h2
            className="
              mt-8
              text-center
              text-3xl
              font-bold
            "
          >
            {title}
          </h2>
        </>
      )}
    </div>
  );
}