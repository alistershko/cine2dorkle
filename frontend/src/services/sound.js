export const isSoundEnabled = () => {
  return localStorage.getItem("soundEnabled") !== "false";
};

export const playSound = (soundFile) => {
  if (isSoundEnabled()) {
    const sound = new Audio(soundFile);
    sound.play();
  }
};
