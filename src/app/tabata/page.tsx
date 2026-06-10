"use client";

import { useMemo } from "react";

import { createTabata } from "@/core/timer-engine/builders/createTabata";
import { useTimerEngine } from "@/core/timer-engine/useTimerEngine";

import { useTimerAudio } from "@/core/audio/useTimerAudio";

import { TimerDisplay } from "@/components/timer/TimerDisplay";
import { TimerControls } from "@/components/timer/TimerControls";

import { formatTime } from "@/utils/formatTime";

export default function TabataPage() {
  const session = useMemo(
    () =>
      createTabata({
        workSeconds: 20,
        restSeconds: 10,
        rounds: 8,
      }),
    [],
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

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 p-8">
      <TimerDisplay
        workout="Tabata"
        status={status}
        title={currentStep.name}
        time={formatTime(remainingTime)}
        progress={progress}
        color="#22c55e"
      />

      <TimerControls onStart={start} onPause={pause} onReset={reset} />
    </main>
  );
}
