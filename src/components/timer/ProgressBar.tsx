'use client';

interface Props {
  value: number;
}

export function ProgressBar({
  value,
}: Props) {
  return (
    <div className="h-4 w-full rounded bg-gray-200">
      <div
        className="h-4 rounded bg-blue-500 transition-all"
        style={{
          width: `${value * 100}%`,
        }}
      />
    </div>
  );
}