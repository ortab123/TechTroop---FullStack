import { fontSizeToPx } from "../lib/themeUtils";
import { useTheme } from "../context/ThemeContext";
import Article from "./Article";
import Sidebar from "./Sidebar";

function Content() {
  const { fontSize } = useTheme();
  const size = fontSizeToPx(fontSize);

  return (
    <main style={{ fontSize: size }}>
      <Article />
      <Sidebar />
    </main>
  );
}

export default Content;
