import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NotesApp from "./NotesApp";
import Modal from "react-modal";
import "./index.css";

Modal.setAppElement("#root");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotesApp />
  </StrictMode>
);
