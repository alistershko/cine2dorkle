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
    <button
      onClick={toggleSound}
      aria-label={soundEnabled ? "Mute Sound" : "Enable Sound"}
      className="bg-gray-100 dark:bg-gray-700 rounded px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
      title={soundEnabled ? "Sound On" : "Sound Off"}
    >
      {soundEnabled ? "🔊" : "🔇"}
    </button>
  );
};

export default SoundToggle;
