import { useState } from "react";
import { format } from "date-fns";
import AddNoteForm from "../components/AddNoteForm.jsx";
import NoteCard from "../components/NoteCard.jsx";
import NoteModal from "../components/NoteModal.jsx";
import "./NotesApp.css";

export default function AddNote() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNote = (title, text) => {
    const newNote = {
      title,
      text,
      date: format(new Date(), "MMM do h:mm a"),
    };
    setNotes([...notes, newNote]);
  };

  const handleDeleteNote = (index) => {
    const confirmDelete = confirm("Are you sure you want to delete your note?");
    if (!confirmDelete) return;

    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const handleOpenModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };
  return (
    <div className="app">
      <AddNoteForm onAddNote={handleAddNote} />
      <div className="notes-grid">
        {notes.map((note, index) => (
          <NoteCard
            key={index}
            note={note}
            onClick={() => handleOpenModal(note)}
            onDelete={() => handleDeleteNote(index)}
          />
        ))}
      </div>
      <NoteModal
        note={selectedNote}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
