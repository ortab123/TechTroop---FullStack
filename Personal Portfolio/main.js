const toggleMenu = () => {
  const overlay = document.getElementById("overlay");
  const body = document.body;
  const isOpen = overlay.style.display === "block";
  if (isOpen) {
    overlay.style.display = "none";
    document.body.style.overflow = "scroll";
  } else {
    overlay.style.display = "block";
    body.style.overflow = "hidden";
  }
};

const jumptosection = () => {
  const overlay = document.getElementById("overlay");
  const body = document.body;
  const isOpen = overlay.style.display === "block";
  if (isOpen) {
    overlay.style.display = "none";
    document.body.style.overflow = "scroll";
  }
};
