import {
  TimerSession,
  TimerStep,
} from '../types';

interface EmomConfig {
  rounds: number;
  intervalSeconds: number;
}

export function createEmom({
  rounds,
  intervalSeconds,
}: EmomConfig): TimerSession {
  const steps: TimerStep[] = [];

  for (let i = 1; i <= rounds; i++) {
    steps.push({
      id: `round-${i}`,
      name: `Minuto ${i}`,
      duration: intervalSeconds,
      type: 'work',
    });
  }

  return {
    name: 'EMOM',
    steps,
  };
}