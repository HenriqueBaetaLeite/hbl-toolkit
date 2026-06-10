'use client';

import { useEffect } from 'react';

import { useTimerEngine } from '@/core/timer-engine/useTimerEngine';

import { formatTime } from '@/utils/formatTime';

import { TimerSession } from '@/core/timer-engine/types';

import { AudioManager } from '@/core/audio/AudioManager';

import { TimerDisplay } from './TimerDisplay';
import { TimerControls } from './TimerControls';
import { ProgressBar } from './ProgressBar';

interface TimerRunnerProps {
  session: TimerSession;
}


export function TimerRunner({
  session,
}: TimerRunnerProps) {
  const {
    engine,
    currentStep,
    remainingTime,
    progress,
    start,
    pause,
    resume,
    reset,
    status,
  } = useTimerEngine(session);

  console.log('TimerRunner renderizou');

  useEffect(() => {

  console.log('ENGINE', engine);

  if (!engine) {
    console.log('ENGINE NULO');
    return;
  }

  console.log('VOU REGISTRAR EVENTOS');

  const unsubscribe =
    engine.subscribeEvents((event) => {

      console.log('EVENTO RECEBIDO', event);

    });

  console.log('EVENTOS REGISTRADOS');

  return unsubscribe;

}, [engine]);

//   useEffect(() => {
//   if (!engine) return;

//   console.log('Registrando eventos');

//   const unsubscribe = engine.subscribeEvents((event) => {
//     console.log('EVENTO RECEBIDO', event);
//   });

//   return unsubscribe;
// }, [engine]);

  return (
    <div className="flex flex-col gap-8 w-full">
      <TimerDisplay
        title={currentStep?.name ?? ''}
        time={formatTime(remainingTime)}
      />

      <ProgressBar value={progress} />

      <TimerControls
        status={status}
        onStart={start}
        onPause={pause}
        onResume={resume}
        onReset={reset}
      />
    </div>
  );
}