import React, { useEffect, useState, useRef } from "react";
import { playSound } from "../services/sound";
import countdownSound from "../assets/Audio/countdown.mp3";
import "../css/Timer.css";

function Timer({ onTimeUp, resetTrigger, onTimerUpdate }) {
  const MAXTIME = 20;
  const [seconds, setSeconds] = useState(MAXTIME);
  const [isFinalCountdown, setIsFinalCountdown] = useState(false);
  const countdownAudioRef = useRef(null);

  // Reset timer when resetTrigger changes
  useEffect(() => {
    setSeconds(MAXTIME);
    setIsFinalCountdown(false);

    // Stop countdown sound if it's playing during reset
    if (countdownAudioRef.current) {
      countdownAudioRef.current.pause();
      countdownAudioRef.current.currentTime = 0;
    }
  }, [resetTrigger]);

  // Handle the countdown effect and sound
  useEffect(() => {
    if (seconds === 0) {
      // Stop countdown sound if it's playing
      if (countdownAudioRef.current) {
        countdownAudioRef.current.pause();
        countdownAudioRef.current = null;
      }

      onTimeUp();
      return;
    }

    // Notify parent component about timer updates
    if (onTimerUpdate) {
      onTimerUpdate(seconds);
    }

    // Start countdown effect and sound at 5 seconds
    if (seconds === 5 && !isFinalCountdown) {
      setIsFinalCountdown(true);

      // Play countdown sound
      countdownAudioRef.current = new Audio(countdownSound);
      playSound(countdownAudioRef.current);
    }

    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeUp, isFinalCountdown, onTimerUpdate]);

  return (
    <div
      className={`timer-container ${isFinalCountdown ? "final-countdown" : ""}`}
    >
      <div
        className={`timer-text ${isFinalCountdown ? "countdown-active" : ""}`}
      >
        {seconds}
      </div>
    </div>
  );
}

export default Timer;
