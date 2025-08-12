import { useEffect, useState } from "react";

export default function CurrentTime() {
  const [displayTime, setDisplayTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const updateTime = () => {
      setDisplayTime(new Date().toLocaleTimeString());
    };

    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p className="curr-time">{displayTime}</p>
    </div>
  );
}
