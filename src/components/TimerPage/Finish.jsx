import { ClockPlus, Trophy } from "lucide-react";
import { Link } from "react-router";

function Finish({ onNewTimer }) {
  return (
    <div>
      <p>Finish</p>
      <div className="flex gap-4">
        <button
          onClick={onNewTimer}
          aria-label="Nuovo timer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary-light hover:text-secondary"
        >
          <ClockPlus />
        </button>
        <Link
          to="/trophies"
          aria-label="Trofei"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary-light hover:text-secondary"
        >
          <Trophy className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}

export default Finish;
