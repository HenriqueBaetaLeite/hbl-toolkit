export type TimerStatus =
  | 'idle'
  | 'running'
  | 'paused'
  | 'finished';

  export type TimerStepType =
  | 'focus'
  | 'short-break'
  | 'long-break'
  | 'work'
  | 'rest';

export interface TimerStep {
  id: string;
  name: string;
  duration: number;
  type: TimerStepType;
}

export interface TimerSession {
  name: string;
  steps: TimerStep[];
}

export interface TimerState {
  status: TimerStatus;
  currentStepIndex: number;
  currentStep: TimerStep | null;
  remainingTime: number;
  progress: number;
}

  export type TimerEvent =
  | {
      type: 'step-start';
      step: TimerStep;
    }
  | {
      type: 'step-end';
      step: TimerStep;
    }
  | {
      type: 'countdown';
      remaining: number;
    }
  | {
      type: 'session-finished';
    }
  | {
      type: 'pause';
    }
  | {
      type: 'resume';
    }
  | {
      type: 'reset';
    };