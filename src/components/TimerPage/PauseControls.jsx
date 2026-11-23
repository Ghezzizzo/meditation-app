import { Play, OctagonX } from "lucide-react";
import IconButton from "../IconButton";

function PauseControls({ onResume, onEnd }) {
  return (
    <div>
      <div className="flex justify-center gap-4">
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

export default PauseControls;
