'use client';

interface Props {
  title: string;
  time: string;
  workout?: string;
  status?: string;
}

export function TimerDisplay({
  title,
  time,
  workout,
  status,
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
        text-center
        shadow-2xl
      "
    >
      {workout && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-400">
          {workout}
        </p>
      )}

      {!sessionFinished ? (
        <>
          <h2 className="text-3xl font-bold text-white">
            {title}
          </h2>

          <div
            className="
              mt-8
              text-7xl
              font-black
              tracking-tight
              text-white
              md:text-8xl
            "
          >
            {time}
          </div>
        </>
      ) : (
        <>
          <div className="text-6xl">
            🎉
          </div>

          <h2 className="mt-4 text-4xl font-black text-white">
            Sessão Finalizada
          </h2>

          <p className="mt-2 text-slate-400">
            Excelente trabalho!
          </p>
        </>
      )}
    </div>
  );
}