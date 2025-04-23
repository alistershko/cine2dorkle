export const isSoundEnabled = () => {
  return localStorage.getItem("soundEnabled") !== "false";
};

export const playSound = (source) => {
  if (isSoundEnabled()) {
    // If source is already an Audio object, play it directly
    if (source instanceof Audio) {
      source.play().catch((e) => console.log("Error playing sound:", e));
      return;
    }

    // Otherwise, create a new Audio object
    const sound = new Audio(source);
    sound.play().catch((e) => console.log("Error playing sound:", e));
  }
};
