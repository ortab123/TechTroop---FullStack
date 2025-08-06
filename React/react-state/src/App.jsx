import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Hudini from "../components/Hudini";
import Home from "../components/Home";
import Landing from "../components/Landing";

function App() {
  const [userData, setUserData] = useState({
    user: "Robyn",
    store: [
      { item: "XSPS Pro Player", price: 800, discount: 0.2, hottest: false },
      { item: "Gizem Backwatch", price: 230, discount: 0.6, hottest: false },
      {
        item: "Surround Sound Pelican",
        price: 3099,
        discount: 0.05,
        hottest: true,
      },
    ],
    shouldDiscount: true,
    currentPage: "Landing",
  });

  const goToPage = (pageName) => {
    setUserData({ ...userData, currentPage: pageName });
  };
  return (
    <div>
      <button onClick={() => goToPage("Landing")}>Go to Landing</button>
      <button onClick={() => goToPage("Home")}>Go to Home</button>
      {userData.currentPage === "Home" && (
        <Home
          storeData={userData.store}
          shouldDiscount={userData.shouldDiscount}
        />
      )}
      {userData.currentPage === "Landing" && (
        <Landing userName={userData.user} storeData={userData.store} />
      )}
    </div>
  );
}

export default App;
