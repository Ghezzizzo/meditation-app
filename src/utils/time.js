export function minToMs(min) {
  return min * 1000 * 60;
}

export function formatTime(ms) {
  const totSec = Math.ceil(Math.max(0, ms) / 1000);
  const totMin = Math.floor(totSec / 60);
  const totHrs = Math.floor(totMin / 60);

  return `${String(totHrs).padStart(2, "0")} : ${String(totMin % 60).padStart(2, "0")} : ${String(totSec % 60).padStart(2, "0")}`;
}
