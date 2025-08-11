export default function Conversation({ convo, contactName, onClose }) {
  return (
    <div>
      <h2>Conversation with {contactName}</h2>
      <button onClick={onClose}>Back to List</button>
      <ul>
        {convo.map((message, idx) => (
          <li
            key={idx}
            style={{ color: message.sender === "self" ? "blue" : "green" }}
          >
            <strong>
              {message.sender === "self" ? "Me: " : `${contactName}: `}
            </strong>
            {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
