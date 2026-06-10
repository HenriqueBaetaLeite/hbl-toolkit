'use client';

import { useEffect, useRef, useState } from 'react';

import { TimerEngine } from './TimerEngine';
import { TimerSession, TimerState } from './types';

export function useTimerEngine(
  session: TimerSession
) {
  const engineRef =
    useRef<TimerEngine | null>(null);

  const [state, setState] =
    useState<TimerState>({
      status: 'idle',
      currentStepIndex: 0,
      currentStep: session.steps[0],
      remainingTime:
        session.steps[0].duration,
      progress: 0,
    });

  useEffect(() => {
    const timerEngine =
      new TimerEngine(session);

    engineRef.current = timerEngine;

    const unsub =
      timerEngine.subscribe(setState);

    return () => {
      unsub();
      timerEngine.destroy();
    };
  }, [session]);

  return {
    ...state,

    start: () =>
      engineRef.current?.start(),

    pause: () =>
      engineRef.current?.pause(),

    resume: () =>
      engineRef.current?.resume(),

    reset: () =>
      engineRef.current?.reset(),
  };
}