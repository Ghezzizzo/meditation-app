import { formatTime } from "../../utils/time";

function Timer({ durationMs, elapsedMs }) {
  return (
    <div className="p-4 font-mono text-4xl">
      {formatTime(durationMs - elapsedMs)}
    </div>
  );
}

export default Timer;
