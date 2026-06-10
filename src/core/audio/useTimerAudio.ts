import { useEffect } from 'react';
import { TimerEngine } from '@/core/timer-engine/TimerEngine';
import { AudioManager } from './AudioManager';

const audio = new AudioManager();

export function useTimerAudio(
  engine: TimerEngine | null
) {
  useEffect(() => {
    if (!engine) return;

    const unsubscribe =
      engine.subscribeEvents((event) => {

        switch (event.type) {

          case 'countdown':
            audio.playCountdown();
            break;

          case 'step-start':
            audio.playStepChange();
            break;

          case 'session-finished':
            audio.playFinish();
            break;
        }
      });

    return unsubscribe;

  }, [engine]);
}