import Contact from "./Contact.jsx";
export default function List({ contacts, onContactClick }) {
  return (
    <div>
      {contacts.map((name) => (
        <Contact key={name} name={name} onClick={() => onContactClick(name)} />
      ))}
    </div>
  );
}
