import Header from "../../components/header";
import Footer from "../../components/Footer";
import "./HomePage.css";
import PlayButton from "../../components/PlayButton";

export const HomePage = () => {
  console.log("Rendering HomePage");

  return (
    <div className="page-container">
      <Header />
      <div className="home-content">
        <h1>Welcome to the Home Page!</h1>
        <PlayButton />
      </div>
      <Footer />
    </div>
  );
};
