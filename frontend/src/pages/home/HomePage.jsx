import { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import "./HomePage.css";
import PlayButton from "../../components/PlayButton";
import ModeToggle from "../../components/ModeToggle";
import { DoubleFeatureLogo } from "../../components/DoubleFeatureLogo";
import ControlsHeader from "../../components/ControlsHeader";
import HowTo from "../../components/HowTo";
import jazz from "../../assets/Audio/Jazz.mp3";
import SoundToggle from "../../components/SoundToggle";

export const HomePage = () => {
  console.log("Rendering HomePage");
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(jazz);
    audioRef.current.loop = true;

    // Check initial sound setting
    const soundEnabled = localStorage.getItem("soundEnabled") !== "false";
    if (soundEnabled) {
      audioRef.current
        .play()
        .catch((e) => console.log("Autoplay prevented:", e));
    }

    // Listen for sound toggle changes
    const handleSoundToggle = () => {
      const soundEnabled = localStorage.getItem("soundEnabled") !== "false";
      if (soundEnabled) {
        audioRef.current.play().catch((e) => console.log("Play prevented:", e));
      } else {
        audioRef.current.pause();
      }
    };

    document.addEventListener("soundSettingChanged", handleSoundToggle);

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener("soundSettingChanged", handleSoundToggle);
    };
  }, []);

  return (
    <div className="page-container">
      <ControlsHeader />
      <div className="home-content">
        <h1 className="home-title">Welcome to</h1>
        <DoubleFeatureLogo />
        <p className="home-p">🎬 Make connections between movies to win 🍿</p>
        <PlayButton />
        <ModeToggle />
        <HowTo />
      </div>
      <Footer />
    </div>
  );
};
