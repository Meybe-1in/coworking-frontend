import {
  CONTROL_HEIGHT,
  inputStyle,
} from "../filters/filterStyles";
import { ChevronDown } from "lucide-react";
import "./TableFilters.css";


export default function FilterSelect({
  value,
  onChange,
  options,
  minWidth = 180,
}) {
  return (
    <div
      className="filter-select-container"
      style={{ height: CONTROL_HEIGHT }}
    >
      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="filter-select"
        style={{...inputStyle,minWidth}}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown size={14} />
    </div>
  );
}