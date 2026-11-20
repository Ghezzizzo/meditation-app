import { Play, OctagonX } from "lucide-react";

function Pause({ onResume, onEnd }) {
  return (
    <div>
      <p>Pause</p>
      <div className="flex gap-4">
        <button
          onClick={onResume}
          aria-label="Riprendi"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary-light hover:text-secondary"
        >
          <Play />
        </button>
        <button
          onClick={onEnd}
          aria-label="Termina"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary-light hover:text-secondary"
        >
          <OctagonX />
        </button>
      </div>
    </div>
  );
}

export default Pause;
