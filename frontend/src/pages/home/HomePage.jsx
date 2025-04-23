import Header from "../../components/header";
import Footer from "../../components/Footer";
import "./HomePage.css";
import PlayButton from "../../components/PlayButton";
import ModeToggle from "../../components/ModeToggle";
import { DoubleFeatureLogo } from "../../components/DoubleFeatureLogo";
import ControlsHeader from "../../components/ControlsHeader";
import HowTo from "../../components/HowTo";

export const HomePage = () => {
  console.log("Rendering HomePage");

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
