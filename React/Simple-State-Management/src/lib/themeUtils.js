export function themeToColors(theme) {
  return theme === "light"
    ? { bg: "#ffffff", fg: "#000000" }
    : { bg: "#1a1a1a", fg: "#ffffff" };
}

export function fontSizeToPx(fontSize) {
  if (fontSize === "small") return "14px";
  if (fontSize === "large") return "20px";
  return "16px"; // ברירת מחדל
}
