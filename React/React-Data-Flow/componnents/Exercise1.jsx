import { useState } from "react";

export default function Exercise1() {
  const [gallery, setGallery] = useState({
    images: [
      "https://hips.hearstapps.com/hmg-prod/images/lychee-fruit-sugar-1530136136.jpg?crop=1xw:1xh;center,top&resize=640:*",
      "https://hips.hearstapps.com/hmg-prod/images/mango-fruit-sugar-1530136260.jpg?crop=1xw:1xh;center,top&resize=640:*",
      "https://hips.hearstapps.com/hmg-prod/images/cherries-sugar-fruit-1530136329.jpg?crop=1xw:1xh;center,top&resize=640:*",
    ],
    currentImg: 0,
  });

  const shiftImageBack = () => {
    setGallery((prev) => ({
      ...prev,
      currentImg:
        (prev.currentImg - 1 + prev.images.length) % prev.images.length,
    }));
  };

  const shiftImageForward = () => {
    setGallery((prev) => ({
      ...prev,
      currentImg: (prev.currentImg + 1) % prev.images.length,
    }));
  };

  return (
    <>
      <button className="back" onClick={shiftImageBack}>
        Back
      </button>
      <img src={gallery.images[gallery.currentImg]} alt="Gallery" width="300" />
      <button className="forward" onClick={shiftImageForward}>
        Forward
      </button>
    </>
  );
}
