import { Pause, RotateCcw } from "lucide-react";
import IconButton from "../IconButton";

function MeditationControls({ onPause, onRestart }) {
  return (
    <div>
      <p>Meditation</p>
      <div className="flex gap-4">
        <IconButton onClick={onPause} ariaLabel="Pausa">
          <Pause />
        </IconButton>
        <IconButton onClick={onRestart} ariaLabel="Ricomincia">
          <RotateCcw />
        </IconButton>
      </div>
    </div>
  );
}

export default MeditationControls;
