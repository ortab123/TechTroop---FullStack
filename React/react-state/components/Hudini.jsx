import { useState } from "react";

export default function Hudini() {
  const [show, setShow] = useState(false);

  return (
    <div>
      {show ? "Now you see me" : "Now you don't"}{" "}
      <button onClick={() => setShow(!show)}>Change visibility</button>
    </div>
  );
}
