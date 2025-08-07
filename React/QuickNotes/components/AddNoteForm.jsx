import { useState } from "react";
import "./AddNoteForm.css";

export default function AddNoteForm({
  onAddNote,
  initialTitle = "",
  initialText = "",
  isEditMode = false,
}) {
  const [noteTitle, setNoteTitle] = useState(initialTitle);
  const [noteText, setNoteText] = useState(initialText);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteText.trim() === "") return;
    onAddNote(noteTitle, noteText);
    if (!isEditMode) {
      setNoteTitle("");
      setNoteText("");
    }
  };

  return (
    <form className="add-note" onSubmit={handleSubmit}>
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
      <button type="submit" className="add-btn">
        {isEditMode ? "Update Note" : "Add"}
      </button>
    </form>
  );
}
