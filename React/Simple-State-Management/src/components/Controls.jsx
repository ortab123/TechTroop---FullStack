import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import FontControl from "./FontControl";

function Controls() {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();
  return (
    <div>
      <ThemeToggle />
      <FontControl />
    </div>
  );
}

export default Controls;
