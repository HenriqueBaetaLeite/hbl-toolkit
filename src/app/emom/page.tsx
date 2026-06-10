"use client";

import { useMemo } from "react";

import { createEmom } from "@/core/timer-engine/builders/createEmom";
import { useTimerEngine } from "@/core/timer-engine/useTimerEngine";

import { useTimerAudio } from "@/core/audio/useTimerAudio";

import { TimerDisplay } from "@/components/timer/TimerDisplay";
import { TimerControls } from "@/components/timer/TimerControls";
import { ProgressBar } from "@/components/timer/ProgressBar";

import { formatTime } from "@/utils/formatTime";

export default function EmomPage() {
  const session = useMemo(
    () =>
      createEmom({
        rounds: 5,
        intervalSeconds: 60,
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
        workout="EMOM"
        status={status}
        title={currentStep?.name ?? ""}
        time={formatTime(remainingTime)}
      />

      <div className="w-full">
        <ProgressBar value={progress} />
      </div>

      <TimerControls onStart={start} onPause={pause} onReset={reset} />
    </main>
  );
}
