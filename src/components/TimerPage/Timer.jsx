function Timer({ duration, elaps }) {
  function formatTime(milliseconds) {
    const totSec = Math.ceil(Math.max(0, milliseconds) / 1000);
    const totMin = Math.floor(totSec / 60);
    const totHrs = Math.floor(totMin / 60);

    return `${String(totHrs).padStart(2, "0")} : ${String(totMin % 60).padStart(2, "0")} : ${String(totSec % 60).padStart(2, "0")}`;
  }
  return (
    <div className="p-4 font-mono text-4xl">{formatTime(duration - elaps)}</div>
  );
}

export default Timer;
