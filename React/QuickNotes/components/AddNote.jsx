import { useState } from "react";

export default function AddNote() {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  const handleClick = () => {
    if (noteText.trim() === "") return;

    const newNote = {
      text: noteText,
      date: new Date().toLocaleDateString("en-GB"),
    };

    setNotes([...notes, newNote]);
    setNoteText("");
  };

  return (
    <div className="app">
      <div className="add-note">
        <textarea
          className="input-txt"
          placeholder="Your note..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button onClick={handleClick} className="add-btn">
          Add
        </button>
      </div>

      <div className="notes-grid">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <small>{note.date}</small>
            <p>{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
