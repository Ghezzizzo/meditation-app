import { formatTime } from "../../utils/time";

const size = 240;
const strokeWidth = 10;

const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

function Timer({ durationMs, elapsedMs }) {
  const remainingMs = durationMs - elapsedMs;
  const progress = durationMs > 0 ? remainingMs / durationMs : 0;
  const dashOffset = circumference * (1 - progress);

  return (
    <div
      className="relative inline-flex items-center justify-center mb-4"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={durationMs}
      aria-valuenow={elapsedMs}
      aria-valuetext={formatTime(remainingMs)}
      aria-label="Timer"
    >
      <svg className="-rotate-90" width={size} height={size}>
        <circle
          className="text-secondary"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary transition-[stroke-dashoffset] duration-150 ease-linear"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute font-mono text-2xl font-semibold text-primary">
        {formatTime(remainingMs)}
      </span>
    </div>
  );
}

export default Timer;
