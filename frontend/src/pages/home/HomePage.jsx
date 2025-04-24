import React from "react";
import { useState, useEffect, useRef } from "react";
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
    try {
      // Create audio element safely
      const audioElement = new Audio(jazz);

      // Store reference after successful creation
      audioRef.current = audioElement;
      audioRef.current.loop = true;

      // Check initial sound setting
      const soundEnabled = localStorage.getItem("soundEnabled") !== "false";
      if (soundEnabled && audioRef.current) {
        audioRef.current
          .play()
          .catch((e) => console.log("Autoplay prevented:", e));
      }

      // Listen for sound toggle changes
      const handleSoundToggle = (event) => {
        const soundEnabled =
          event?.detail?.soundEnabled ??
          localStorage.getItem("soundEnabled") !== "false";

        if (soundEnabled && audioRef.current) {
          audioRef.current
            .play()
            .catch((e) => console.log("Play prevented:", e));
        } else if (audioRef.current) {
          audioRef.current.pause();
        }
      };

      document.addEventListener("soundSettingChanged", handleSoundToggle);

      // Cleanup function
      return () => {
        if (audioRef.current) {
          try {
            audioRef.current.pause();
          } catch (e) {
            console.log("Error pausing audio:", e);
          }
          audioRef.current = null;
        }
        document.removeEventListener("soundSettingChanged", handleSoundToggle);
      };
    } catch (error) {
      console.error("Error setting up audio:", error);
    }
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
