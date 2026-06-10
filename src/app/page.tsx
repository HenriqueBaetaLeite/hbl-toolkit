import Link from 'next/link';

const timers = [
  {
    title: 'Pomodoro',
    description:
      'Foco e produtividade com ciclos de trabalho e descanso.',
    href: '/pomodoro',
    color: 'from-red-500 to-orange-500',
    emoji: '🍅',
  },
  {
    title: 'Tabata',
    description:
      'Treino intervalado de alta intensidade com rounds rápidos.',
    href: '/tabata',
    color: 'from-green-500 to-emerald-600',
    emoji: '🔥',
  },
  {
    title: 'EMOM',
    description:
      'Every Minute On the Minute para treinos estruturados.',
    href: '/emom',
    color: 'from-yellow-500 to-amber-600',
    emoji: '⏱️',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col px-6 py-16">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-black md:text-7xl">
            HBL Toolkit
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            Timers para produtividade, treino e performance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {timers.map((timer) => (
            <Link
              key={timer.href}
              href={timer.href}
              className="
                group
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-6
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-slate-700
                hover:shadow-2xl
                hover:shadow-black/40
              "
            >
              <div className="text-5xl">
                {timer.emoji}
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                {timer.title}
              </h2>

              <p className="mt-3 min-h-18 text-slate-400">
                {timer.description}
              </p>

              <div className="mt-8">
                <span
                  className={`
                    inline-flex
                    items-center
                    rounded-full
                    bg-linear-to-r
                    ${timer.color}
                    px-5
                    py-2
                    text-sm
                    font-semibold
                    text-white
                  `}
                >
                  Iniciar →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-slate-500">
          Desenvolvido por Henrique Baêta
        </div>
      </div>
    </main>
  );
}