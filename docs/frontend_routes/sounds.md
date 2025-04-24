# Sound Service Documentation

Services for handling audio playback and sound preferences in the application.

# Tech Stack

Frontend: React
Backend: Express.js
Audio Integration: HTML5 Audio API

# Environment

No environment variables are required for this service.

==============================================================

# Services

# isSoundEnabled()

Checks if sound is enabled in the application based on the user's preferences.

# Parameters

None

# Returns

Boolean: `true` if sound is enabled, `false` if sound is disabled

- Default is `true` unless explicitly set to `false`

# Implementation

```javascript
export const isSoundEnabled = () => {
  return localStorage.getItem("soundEnabled") !== "false";
};
```

==============================================================

# playSound(source)

Plays a sound if sound is enabled in the application.

# Parameters

source: `string` or `Audio` object representing the sound to be played

# Returns

None

# Implementation

```javascript
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

// Listen for sound setting changes
document.addEventListener("soundSettingChanged", (event) => {
  const soundEnabled = event.detail.soundEnabled;
  if (soundEnabled && audioRef.current) {
    audioRef.current.play().catch((e) => console.log("Play prevented:", e));
  } else if (audioRef.current) {
    audioRef.current.pause();
  }
});
```

==============================================================

# Example Usage

# Importing and Using Sound Services

```javascript
import { playSound, isSoundEnabled } from "../services/sound";
import successSound from "../assets/Audio/success.mp3";

// Check if sound is enabled
if (isSoundEnabled()) {
  console.log("Sound is enabled, audio will play");
} else {
  console.log("Sound is disabled, audio will be muted");
}

// Play a sound from a file path
playSound(successSound);

// Play a sound from an Audio object
const countdownAudio = new Audio("/path/to/countdown.mp3");
playSound(countdownAudio);

// Create a background music loop
const backgroundMusic = new Audio("/path/to/music.mp3");
backgroundMusic.loop = true;
if (isSoundEnabled()) {
  backgroundMusic.play().catch((e) => console.log("Autoplay prevented:", e));
}

// Pause background music
if (!isSoundEnabled()) {
  backgroundMusic.pause();
}
```
