import { TimerSession, TimerState, TimerStep } from './types';

type Listener = (state: TimerState) => void;

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
  };

export type EventListener = (
  event: TimerEvent
) => void;

export class TimerEngine {
  private listeners = new Set<Listener>();
  private eventListeners = new Set<EventListener>();

  private animationFrame: number | null = null;

  private startTimestamp = 0;
  private elapsedBeforePause = 0;

  private lastRemaining = -1;
  private lastElapsed = -1;

  private state: TimerState;

  constructor(private session: TimerSession) {
    const first = session.steps[0];

    this.state = {
      status: 'idle',
      currentStepIndex: 0,
      currentStep: first,
      remainingTime: first.duration,
      progress: 0,
    };
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);

    listener({ ...this.state });

    return () => {
      this.listeners.delete(listener);

    }
  }

  subscribeEvents(listener: EventListener) {
    this.eventListeners.add(listener);

    return () => {
      this.eventListeners.delete(listener);
    };
  }

  private emit() {
    const snapshot = { ...this.state };

    this.listeners.forEach((listener) =>
      listener(snapshot)
    );
  }

  private emitEvent(event: TimerEvent) {
    this.eventListeners.forEach((listener) =>
      listener(event)
    );
  }

  start() {
    if (this.state.status === 'running') return;

    if (this.state.status === 'paused') {
      return this.resume();
    }

    this.state = {
      ...this.state,
      status: 'running',
    };

    this.startTimestamp = performance.now();

    this.elapsedBeforePause = 0;
    this.lastElapsed = -1;
    this.lastRemaining =
      this.state.currentStep.duration;

    this.emitEvent({
      type: 'step-start',
      step: this.state.currentStep,
    });

    this.loop();

    this.emit();
  }

  resume() {
    if (this.state.status !== 'paused') return;

    this.state = {
      ...this.state,
      status: 'running',
    };

    this.startTimestamp =
      performance.now() - this.elapsedBeforePause;

    this.loop();

    this.emit();
  }

  pause() {
    if (this.state.status !== 'running') return;

    this.elapsedBeforePause =
      performance.now() - this.startTimestamp;

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.state = {
      ...this.state,
      status: 'paused',
    };

    this.emit();
  }

  reset() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    const first = this.session.steps[0];

    this.lastRemaining = -1;
    this.lastElapsed = -1;

    this.state = {
      status: 'idle',
      currentStepIndex: 0,
      currentStep: first,
      remainingTime: first.duration,
      progress: 0,
    };

    this.emit();
  }

  private loop = () => {
    if (this.state.status !== 'running') return;

    const elapsed = Math.floor(
      (performance.now() - this.startTimestamp) /
      1000
    );

    if (elapsed === this.lastElapsed) {
      this.animationFrame =
        requestAnimationFrame(this.loop);

      return;
    }

    this.lastElapsed = elapsed;

    const duration =
      this.state.currentStep?.duration ?? 0;

    const remaining = duration - elapsed;

    if (
      remaining !== this.lastRemaining &&
      remaining > 0 &&
      remaining <= 3
    ) {
      this.emitEvent({
        type: 'countdown',
        remaining,
      });
    }

    this.lastRemaining = remaining;

    this.state = {
      ...this.state,
      remainingTime: Math.max(0, remaining),
      progress: duration
        ? 1 - remaining / duration
        : 1,
    };

    if (remaining <= 0) {
      this.nextStep();

      return;
    }

    this.emit();

    this.animationFrame =
      requestAnimationFrame(this.loop);
  };

  private nextStep() {
    this.emitEvent({
      type: 'step-end',
      step: this.state.currentStep,
    });

    const next =
      this.state.currentStepIndex + 1;

    if (next >= this.session.steps.length) {
      this.state = {
        ...this.state,
        status: 'finished',
        remainingTime: 0,
        progress: 1,
      };

      this.emitEvent({
        type: 'session-finished',
      });

      this.emit();

      return;
    }

    const step = this.session.steps[next];

    this.state = {
      ...this.state,
      currentStepIndex: next,
      currentStep: step,
      remainingTime: step.duration,
      progress: 0,
    };

    this.startTimestamp = performance.now();

    this.lastElapsed = -1;
    this.lastRemaining = step.duration;

    this.emitEvent({
      type: 'step-start',
      step,
    });

    this.emit();

    this.animationFrame =
      requestAnimationFrame(this.loop);
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.listeners.clear();
    this.eventListeners.clear();
  }
}