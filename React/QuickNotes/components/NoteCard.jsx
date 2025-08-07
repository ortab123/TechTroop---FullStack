import { FaTimes } from "react-icons/fa";
import "./NoteCard.css";

export default function NoteCard({ note, onClick, onDelete }) {
  return (
    <div className="note" onClick={onClick}>
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <FaTimes />
      </button>
      <h5 className="title">{note.title}</h5>
      <p>{note.text}</p>
      <small>Created: {note.createdAt}</small>
      {note.updatedAt && <small> Updated: {note.updatedAt}</small>}
    </div>
  );
}
