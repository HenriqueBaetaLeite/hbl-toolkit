"use client";

import { useMemo } from "react";

import { createPomodoro } from "@/core/timer-engine/builders/createPomodoro";
import { useTimerEngine } from "@/core/timer-engine/useTimerEngine";

import { TimerDisplay } from "@/components/timer/TimerDisplay";
import { TimerControls } from "@/components/timer/TimerControls";
import { ProgressBar } from "@/components/timer/ProgressBar";

import { formatTime } from "@/utils/formatTime";
import { useTimerAudio } from "@/core/audio/useTimerAudio";

export default function PomodoroPage() {
  const session = useMemo(
    () =>
      createPomodoro({
        focusMinutes: 25,
        shortBreakMinutes: 5,
        longBreakMinutes: 15,
        cycles: 8,
        longBreakEvery: 4,
      }),
    [],
  );

  const {
    currentStep,
    remainingTime,
    progress,
    start,
    pause,
    reset,
    status,
    subscribeEvents,
  } = useTimerEngine(session);

  useTimerAudio(subscribeEvents);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 p-8">
      <TimerDisplay
        workout="Pomodoro"
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
