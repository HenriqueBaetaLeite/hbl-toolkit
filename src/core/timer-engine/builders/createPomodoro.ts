import {
  TimerSession,
  TimerStep,
} from '../types';

interface PomodoroConfig {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  cycles: number;
  longBreakEvery?: number;
}

export function createPomodoro({
  focusMinutes,
  shortBreakMinutes,
  longBreakMinutes,
  cycles,
  longBreakEvery = 4,
}: PomodoroConfig): TimerSession {

  const steps: TimerStep[] = [];

  for (let i = 1; i <= cycles; i++) {

    steps.push({
      id: `focus-${i}`,
      name: `Foco ${i}`,
      duration: focusMinutes * 60,
      type: 'focus'
    });

    const isLastFocus =
      i === cycles;

    if (isLastFocus) {
      continue;
    }

    const shouldUseLongBreak =
      i % longBreakEvery === 0;

    steps.push({
      id: shouldUseLongBreak
        ? `long-break-${i}`
        : `short-break-${i}`,

      name: shouldUseLongBreak
        ? 'Pausa Longa'
        : 'Pausa Curta',

      duration: shouldUseLongBreak
        ? longBreakMinutes * 60
        : shortBreakMinutes * 60,

      type: shouldUseLongBreak ? 'long-break' : 'short-break',
    });
  }

  return {
    name: 'Pomodoro',
    steps,
  };
}