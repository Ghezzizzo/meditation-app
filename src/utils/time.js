export function minToMs(min) {
  return min * 1000 * 60;
}

export function msToMin(ms) {
  return ms / 1000 / 60;
}

function calcTime(ms) {
  const totSec = Math.ceil(Math.max(0, ms) / 1000);
  const totMin = Math.floor(totSec / 60);
  const totHrs = Math.floor(totMin / 60);

  const min = totMin % 60;
  const sec = totSec % 60;

  return [
    { number: totHrs, txtSing: "ora", txtPlur: "ore" },
    { number: min, txtSing: "min", txtPlur: "min" },
    { number: sec, txtSing: "sec", txtPlur: "sec" },
  ];
}

export function formatTime(ms) {
  const times = calcTime(ms);

  return `${String(times[0].number).padStart(2, "0")} : ${String(times[1].number).padStart(2, "0")} : ${String(times[2].number).padStart(2, "0")}`;
}

export function formatTimeText(ms) {
  const times = calcTime(ms);

  const notZero = (time) => time.number !== 0;
  const timeToText = (time) =>
    `${time.number} ${time.number > 1 ? time.txtPlur : time.txtSing}`;

  const timesFiltered = times.filter(notZero);
  const timesText = timesFiltered.map(timeToText);

  return timesText.join(" ");
}
