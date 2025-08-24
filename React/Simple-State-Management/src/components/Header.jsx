import Navigation from "./Navigation";
import Controls from "./Controls";

function Header() {
  return (
    <header style={{ marginBottom: "20px" }}>
      <Navigation />
      <Controls />
    </header>
  );
}

export default Header;
