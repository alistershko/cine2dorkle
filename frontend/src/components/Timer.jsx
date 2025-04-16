import React, { useEffect, useState } from "react";

// Need to add code so timer is triggered by:
//      1. playButton
//      2. Successful go when playing (timer resets)

function Timer({ onTimeUp }) {
  const [seconds, setSeconds] = useState(5);

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
    <div className="flex flex-col items-center justify-center">
      {/* Swap this out with <img src={`/countdown${seconds}.png`} /> if we use a clock image */}
      <div className="text-7xl font-bold text-white font-mono animate-pulse">
        {seconds}
      </div>
    </div>
  );
}

export default Timer;



// App code to add ResultsModal when timer ends

// function App() {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const handleTimeUp = () => {
//     setModalVisible(true); // Show the scoreboard modal
//   };

//   return (
//     <div>
//       <Timer onTimeUp={handleTimeUp} />
      
//       {isModalVisible && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Scoreboard</h2>
//             <p>Game Over! Your time is up!</p>
//             <button onClick={() => setModalVisible(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
