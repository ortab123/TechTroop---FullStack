import Modal from "react-modal";
import AddNoteForm from "./AddNoteForm";
import "./NoteModal.css";
import { useState } from "react";

export default function NoteModal({ note, isOpen, onClose, onUpdateNote }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!note || !isOpen) return null;

  const handleSubmit = (title, text) => {
    onUpdateNote({ title, text });
    setIsEditing(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Note Details"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div>
        {isEditing ? (
          <AddNoteForm
            onAddNote={handleSubmit}
            initialTitle={note.title}
            initialText={note.text}
            isEditMode={true}
          />
        ) : (
          <div>
            <h2 onDoubleClick={() => setIsEditing(true)}>{note.title}</h2>
            <p onDoubleClick={() => setIsEditing(true)}>{note.text}</p>
          </div>
        )}
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
