import { useState } from "react";

const Exercise1 = () => {
  const [person, setPerson] = useState({ name: "", age: "" });

  const handleChange = (event, property) => {
    setPerson({ ...person, [property]: event.target.value });
  };

  const handleClick = () => {
    if (person.age >= 22) {
      alert(
        `Come in ${person.name}, you're ${person.age} - that's good enough`
      );
    } else {
      alert(`Hey ${person.name}, you're cute but ${person.age} is too young`);
    }
  };
  return (
    <div>
      <input
        id="name-input"
        onChange={(e) => handleChange(e, "name")}
        placeholder="Type your name"
        value={person.name}
      />
      <input
        id="age-input"
        onChange={(e) => handleChange(e, "age")}
        placeholder="Type your age"
        value={person.age}
      />
      <button onClick={handleClick}>Go to Bar</button>
    </div>
  );
};
export default Exercise1;
