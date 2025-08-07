import Modal from "react-modal";
import "./NoteModal.css";
Modal.setAppElement("#root");

export default function NoteModal({ note, isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Note Details"
      className="modal"
      overlayClassName="modal-overlay"
    >
      {note && (
        <div>
          <small>{note.date}</small>
          <h2>{note.title}</h2>
          <p>{note.text}</p>
          <br />
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </Modal>
  );
}
