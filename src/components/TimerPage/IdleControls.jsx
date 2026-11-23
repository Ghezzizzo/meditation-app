import { Play } from "lucide-react";
import IconButton from "../IconButton";

function IdleControls({ onStart }) {
  return (
    <div>
      <p>Idle</p>

      <IconButton onClick={onStart} ariaLabel="Avvia">
        <Play />
      </IconButton>
    </div>
  );
}

export default IdleControls;
