import React, { useState, useEffect } from "react";
import mutedPath from "../assets/muted-red-gold.png";
import unmutedPath from "../assets/on-red-gold.png";

const SoundToggle = () => {
  const [soundEnabled, setSoundEnabled] = useState(
    localStorage.getItem("soundEnabled") !== "false"
  );

  useEffect(() => {
    localStorage.setItem("soundEnabled", soundEnabled);
    document.documentElement.setAttribute("data-sound-enabled", soundEnabled);
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled((prevState) => !prevState);
  };

  return (
    <>
      <button
        onClick={toggleSound}
        aria-label={soundEnabled ? "Mute Sound" : "Enable Sound"}
        className="bg-gray-100 dark:bg-gray-700 rounded px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
        title={soundEnabled ? "Sound On" : "Sound Off"}
      >
        {soundEnabled ? <img src={unmutedPath}></img> : <img src={mutedPath}></img>}
      </button>
    </>
  );
};

export default SoundToggle;
