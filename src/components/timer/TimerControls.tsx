'use client';

interface Props {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function TimerControls({
  onStart,
  onPause,
  onReset,
}: Props) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onStart}
        className="rounded bg-green-600 px-4 py-2 cursor-pointer"
      >
        Start
      </button>

      <button
        onClick={onPause}
        className="rounded bg-yellow-600 px-4 py-2 cursor-pointer"
      >
        Pause
      </button>

      <button
        onClick={onReset}
        className="rounded bg-red-600 px-4 py-2 cursor-pointer"
      >
        Reset
      </button>
    </div>
  );
}