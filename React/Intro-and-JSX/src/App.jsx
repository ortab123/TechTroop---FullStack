import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  //Ex1
  // const showCompany = (name, revenue) => {
  //   return (
  //     <div key={name} id={name}>
  //       {name} makes {revenue} billion every year.
  //     </div>
  //   );
  // };

  // let companies = [
  //   { name: "Tesla", revenue: 140 },
  //   { name: "Microsoft", revenue: 300 },
  //   { name: "Google", revenue: 600 },
  // ];
  // return (
  //   <div className="ex-space">
  //     <h4 className="ex-title">Exercise 1</h4>
  //     <div className="exercise" id="ex-1">
  //       {companies.map((company) => showCompany(company.name, company.revenue))}
  //     </div>
  //   </div>
  // );

  //Ex2
  const getClassName = (temperature) => {
    if (temperature < 15) {
      return "freezing";
    } else if (temperature > 30) {
      return "hell-scape";
    } else {
      return "fair";
    }
  };

  const temp = -1;

  return (
    <div className="ex-space">
      <h4 className="ex-title">Exercise 2</h4>
      <div className="exercise" id="ex-2">
        <div id="weatherBox" className={getClassName(temp)}></div>
      </div>
    </div>
  );
}

export default App;
