import type { ChangeEvent } from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Toggle = ({ checked, onChange }: ToggleProps) => (
  <div className={`react-toggle${checked ? " react-toggle--checked" : ""}`}>
    <div className="react-toggle-track">
      <div className="react-toggle-thumb"></div>
    </div>
    <input
      type="checkbox"
      className="react-toggle-screenreader-only"
      checked={checked}
      onChange={onChange}
      aria-label="Toggle pressmen tools"
    />
  </div>
);

export default Toggle;
