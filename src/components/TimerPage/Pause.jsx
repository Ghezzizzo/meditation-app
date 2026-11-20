import { Play, OctagonX } from "lucide-react";
import IconButton from "../IconButton";

function Pause({ onResume, onEnd }) {
  return (
    <div>
      <p>Pause</p>
      <div className="flex gap-4">
        <IconButton onClick={onResume} ariaLabel="Riprendi">
          <Play />
        </IconButton>
        <IconButton onClick={onEnd} ariaLabel="Termina">
          <OctagonX />
        </IconButton>
      </div>
    </div>
  );
}

export default Pause;
