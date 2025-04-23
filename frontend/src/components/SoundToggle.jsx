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
        className="toggle-btn"
        title={soundEnabled ? "Sound On" : "Sound Off"}
      >
        {soundEnabled ? <img src={unmutedPath}></img> : <img src={mutedPath}></img>}
      </button>
    </>
  );
};

export default SoundToggle;
