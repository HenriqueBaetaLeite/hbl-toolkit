"use client";

import { useTimerEngine } from "@/core/timer-engine/useTimerEngine";

import { formatTime } from "@/utils/formatTime";

import { TimerSession } from "@/core/timer-engine/types";

import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";
import { ProgressBar } from "./ProgressBar";

interface TimerRunnerProps {
  session: TimerSession;
}

export function TimerRunner({ session }: TimerRunnerProps) {
  const {
    currentStep,
    remainingTime,
    progress,
    start,
    pause,
    // resume,
    reset,
  } = useTimerEngine(session);

  return (
    <div className="flex flex-col gap-8 w-full">
      <TimerDisplay
        title={currentStep?.name ?? ""}
        time={formatTime(remainingTime)}
      />

      <ProgressBar value={progress} />

      <TimerControls
        onStart={start}
        onPause={pause}
        // onResume={resume}
        onReset={reset}
      />
    </div>
  );
}
