import { useState } from "react";

const Exercise2 = () => {
  const [name, setName] = useState("");
  const [fruit, setFruit] = useState("");

  const handleFruitChange = (e) => {
    const selectedFruit = e.target.value;
    setFruit(selectedFruit);

    if (name) {
      console.log(`${name} selected ${selectedFruit}`);
    }
  };
  return (
    <div>
      <input
        id="name-input"
        placeholder="Type your name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label for="fruits">Choose a fruit:</label>
      <select id="select-input" onChange={handleFruitChange} value={fruit}>
        <option value="">-- Select a fruit --</option>
        <option value="Mango">Mango</option>
        <option value="Bananna">Bananna</option>
        <option value="Watermellon">Watermellon</option>
        <option value="Apple">Apple</option>
      </select>
    </div>
  );
};
export default Exercise2;
