import { useEffect } from 'react';

import confetti from 'canvas-confetti';

import {
  EventListener,
} from '@/core/timer-engine/TimerEngine';

import { AudioManager } from './AudioManager';

const audio = new AudioManager();

type SubscribeEvents = (
  listener: EventListener
) => (() => void) | undefined;

export function useTimerAudio(
  subscribeEvents?: SubscribeEvents
) {
  useEffect(() => {
    if (!subscribeEvents) return;

    const unsubscribe =
      subscribeEvents((event) => {
        switch (event.type) {
          case 'countdown':
            audio.playCountdown();
            break;

          case 'step-start':
            audio.playStepChange();
            break;

          case 'session-finished':
            audio.playFinish();
            confetti({
              particleCount: 150,
              spread: 100,
            });
            break;
        }
      });

    return unsubscribe;
  }, [subscribeEvents]);
}