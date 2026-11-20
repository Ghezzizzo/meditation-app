import { Play } from "lucide-react";

function Idle({ onStart }) {
  return (
    <div>
      <p>Idle</p>
      <button
        onClick={onStart}
        aria-label="Avvia"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary-light hover:text-secondary"
      >
        <Play />
      </button>
    </div>
  );
}

export default Idle;
