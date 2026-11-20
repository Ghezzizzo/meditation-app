import { Pause, RotateCcw } from "lucide-react";

function Meditation({ onPause }) {
  return (
    <div>
      <p>Meditation</p>
      <div className="flex gap-4">
        <button
          onClick={onPause}
          aria-label="Pausa"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary-light hover:text-secondary"
        >
          <Pause />
        </button>
        <button
          aria-label="Ricomincia"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary-light hover:text-secondary"
        >
          <RotateCcw />
        </button>
      </div>
    </div>
  );
}

export default Meditation;
