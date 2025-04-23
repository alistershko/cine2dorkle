import Header from "../../components/header";
import Footer from "../../components/Footer";
import "./HomePage.css";
import PlayButton from "../../components/PlayButton";
import ModeToggle from "../../components/ModeToggle";
import ControlsHeader from "../../components/ControlsHeader";

export const HomePage = () => {
  console.log("Rendering HomePage");

  return (
    <div className="page-container">
      <Header />
      <ControlsHeader />
      <div className="home-content">
        <h1>Welcome to Double Feature!</h1>
        <p>Make connections between movies to win!</p>
        <PlayButton />
        <ModeToggle />
      </div>
      <Footer />
    </div>
  );
};
