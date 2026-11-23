import { ClockPlus, Trophy } from "lucide-react";
import IconButton from "../IconButton";
import IconLink from "../IconLink";

function FinishControls({ onNewTimer }) {
  return (
    <div>
      <div className="flex justify-center gap-4">
        <IconButton onClick={onNewTimer} ariaLabel="Nuovo timer">
          <ClockPlus />
        </IconButton>

        <IconLink to="/trophies" ariaLabel="Trofei">
          <Trophy />
        </IconLink>
      </div>
    </div>
  );
}

export default FinishControls;
