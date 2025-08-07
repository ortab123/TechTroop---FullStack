import { useState } from "react";
import "./AddNoteForm.css";

export default function AddNoteForm({ onAddNote }) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");

  const handleSubmit = () => {
    if (noteText.trim() === "") return;
    onAddNote(noteTitle, noteText);
    setNoteTitle("");
    setNoteText("");
  };

  return (
    <div className="add-note">
      <input
        className="title-input"
        placeholder="Title"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      <textarea
        className="input-txt"
        placeholder="Your note..."
        value={noteText}
        onChange={(e) => {
          setNoteText(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
      />
      <button onClick={handleSubmit} className="add-btn">
        Add
      </button>
    </div>
  );
}
