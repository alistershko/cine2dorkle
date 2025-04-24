import mutedPath from "../assets/muted-red-gold.png";
import unmutedPath from "../assets/on-red-gold.png";
import React, { useState, useEffect, useCallback } from "react";


const SoundToggle = () => {
  const [soundEnabled, setSoundEnabled] = useState(
    localStorage.getItem("soundEnabled") !== "false"
  );

  useEffect(() => {
    localStorage.setItem("soundEnabled", soundEnabled);
    document.documentElement.setAttribute("data-sound-enabled", soundEnabled);

    // Dispatch custom event outside of the state update
    const event = new CustomEvent("soundSettingChanged", {
      detail: { soundEnabled },
    });
    document.dispatchEvent(event);
  }, [soundEnabled]);

  // Use useCallback to prevent unnecessary re-creation
  const toggleSound = useCallback(() => {
    setSoundEnabled((prevState) => !prevState);
  }, []);

  return (
    <>
      <button
        onClick={toggleSound}
        aria-label={soundEnabled ? "Mute Sound" : "Enable Sound"}
        className="toggle-btn"
        title={soundEnabled ? "Sound On" : "Sound Off"}
        data-testid="sound-toggle"
      >
        {soundEnabled ? <img src={unmutedPath}></img> : <img src={mutedPath}></img>}
      </button>
    </>
  );
};

export default SoundToggle;
