import { themeToColors } from "../lib/themeUtils";
import { useTheme } from "../context/ThemeContext";
import Header from "./Header";
import Content from "./Content";

function Layout() {
  const { theme, fontSize } = useTheme();
  const { bg, fg } = themeToColors(theme);

  return (
    <div style={{ backgroundColor: bg, color: fg }}>
      <Header />
      <Content />
    </div>
  );
}

export default Layout;
