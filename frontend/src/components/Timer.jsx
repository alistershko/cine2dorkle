import React, { useEffect, useState } from "react";
import "../css/Timer.css";

function Timer({ onTimeUp, resetTrigger }) {
  const [seconds, setSeconds] = useState(15);

  // Resets timer when resetTrigger changes
  useEffect(() => {
    setSeconds(15); // Set back to full time 
  }, [resetTrigger]);

  // This runs when component shows & whenever 'seconds' changes
  useEffect(() => {
    if (seconds === 0) {
      onTimeUp(); // Function called when timer hits 0
      return; // Return early (no need to keep counting)
    }

    // If timer not at 0, start timer that runs every 1 seconds
    // setInterval runs code at interval of 1000ms (1s)
    const interval = setInterval(() => {
      // Code run is callback function setSeconds which updates the countdown
      setSeconds((s) => s - 1);
    }, 1000);

    // Clears old timer
    return () => clearInterval(interval);
    // Tells react to re-run useEffect when seconds changes or onTimeUp function changes
  }, [seconds, onTimeUp]);

  return (
    <div className="timer-container flex flex-col items-center justify-center">
      <div className="timer-text">
        {seconds}
      </div>
    </div>
  );  
};

export default Timer;
