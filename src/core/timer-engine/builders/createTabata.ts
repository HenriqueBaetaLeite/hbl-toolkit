
import {
  TimerSession,
  TimerStep,
} from '../types';

interface TabataConfig {
  workSeconds: number;
  restSeconds: number;
  rounds: number;
}

export function createTabata({
  workSeconds,
  restSeconds,
  rounds,
}: TabataConfig): TimerSession {
  const steps: TimerStep[] = [];

  for (let i = 1; i <= rounds; i++) {
    steps.push({
      id: `work-${i}`,
      name: `Trabalho ${i}`,
      duration: workSeconds,
      type: 'work',
    });

    if (i < rounds) {
      steps.push({
        id: `rest-${i}`,
        name: `Descanso ${i}`,
        duration: restSeconds,
        type: 'rest',
      });
    }
  }

  return {
    name: 'Tabata',
    steps,
  };
}