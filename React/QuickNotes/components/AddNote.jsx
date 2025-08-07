import { useState } from "react";
import { format } from "date-fns";
import { FaTimes } from "react-icons/fa";

export default function AddNote() {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  const handleClick = () => {
    if (noteText.trim() === "") return;

    const newNote = {
      text: noteText,
      date: format(new Date(), "MMM do h:mm a"),
    };

    setNotes([...notes, newNote]);
    setNoteText("");
  };

  const handleDeleteNote = (index) => {
    const confirmDelete = confirm("Are you sure you want to delete your note?");
    if (!confirmDelete) return;

    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
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
            <button
              className="delete-btn"
              onClick={() => handleDeleteNote(index)}
            >
              <FaTimes />
            </button>
            <p>{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
