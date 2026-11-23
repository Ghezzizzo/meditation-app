import { Play } from "lucide-react";
import IconButton from "../IconButton";

function IdleControls({ onStart }) {
  return (
    <div className="flex justify-center gap-4">
      <IconButton onClick={onStart} ariaLabel="Avvia">
        <Play />
      </IconButton>
    </div>
  );
}

export default IdleControls;
