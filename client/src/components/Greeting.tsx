import React, { useState, useEffect } from "react";
import "../assets/styles/greeting.css";
import { greetings } from "./DATES/greetings";

const GreetingTimer: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const timer: number = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="greeting-container">
      <h1 key={index} className="greeting-text">
        {greetings[index]}
      </h1>
    </div>
  );
};

export default GreetingTimer;
