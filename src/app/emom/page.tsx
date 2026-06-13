'use client';

import { useMemo, useState } from 'react';

import { createEmom } from '@/core/timer-engine/builders/createEmom';
import { useTimerEngine } from '@/core/timer-engine/useTimerEngine';

import { useTimerAudio } from '@/core/audio/useTimerAudio';

import { TimerDisplay } from '@/components/timer/TimerDisplay';
import { TimerControls } from '@/components/timer/TimerControls';

import { ConfigModal } from '@/components/modals/ConfigModal';

import { formatTime } from '@/utils/formatTime';

export default function EmomPage() {
  const [showConfig, setShowConfig] =
    useState(false);

  const [rounds, setRounds] =
    useState(5);

  const [draftRounds, setDraftRounds] =
    useState(5);

  const session = useMemo(
    () =>
      createEmom({
        rounds: Math.max(1, rounds),
        intervalSeconds: 60,
      }),
    [rounds]
  );

  const {
    status,
    currentStep,
    remainingTime,
    progress,
    start,
    pause,
    reset,
    subscribeEvents,
  } = useTimerEngine(session);

  useTimerAudio(subscribeEvents);

  function handleOpenConfig() {
    setDraftRounds(rounds);
    setShowConfig(true);
  }

  function handleSaveConfig() {
    setRounds(
      Math.max(1, draftRounds)
    );

    setShowConfig(false);
  }

  return (
    <main
      className="
        mx-auto
        flex
        min-h-screen
        max-w-3xl
        flex-col
        items-center
        justify-center
        gap-8
        p-8
      "
    >
      <div className="w-full flex justify-end">
        <button
          onClick={handleOpenConfig}
          className="
            rounded-xl
            bg-slate-800
            px-4
            py-2
            font-semibold
            transition
            hover:bg-slate-700
          "
        >
          ⚙ Configurar
        </button>
      </div>

      <TimerDisplay
        workout="EMOM"
        status={status}
        title={currentStep.name}
        time={formatTime(
          remainingTime
        )}
        progress={progress}
        color="#eab308"
      />

      <TimerControls
        onStart={start}
        onPause={pause}
        onReset={reset}
      />

      <ConfigModal
        title="Configurar EMOM"
        open={showConfig}
        onClose={() =>
          setShowConfig(false)
        }
      >
        <div className="space-y-4">
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                text-slate-400
              "
            >
              Número de rounds
            </label>

            <input
              type="number"
              min={1}
              value={draftRounds}
              onChange={(e) => {
                const value = Number(
                  e.target.value
                );

                setDraftRounds(
                  Number.isNaN(value)
                    ? 1
                    : Math.max(1, value)
                );
              }}
              className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-800
                px-4
                py-3
              "
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() =>
                setShowConfig(false)
              }
              className="
                flex-1
                rounded-xl
                bg-slate-700
                py-3
                font-semibold
                transition
                hover:bg-slate-600
              "
            >
              Cancelar
            </button>

            <button
              onClick={
                handleSaveConfig
              }
              className="
                flex-1
                rounded-xl
                bg-yellow-600
                py-3
                font-semibold
                transition
                hover:bg-yellow-500
              "
            >
              Salvar
            </button>
          </div>
        </div>
      </ConfigModal>
    </main>
  );
}