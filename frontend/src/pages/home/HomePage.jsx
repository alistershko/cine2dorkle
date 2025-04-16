import Header from "../../components/header";
import Footer from "../../components/Footer";
import "./HomePage.css";

export const HomePage = () => {
  console.log("Rendering HomePage");

  return (
    <div className="page-container">
      <Header />
      <div className="home-content">
        <h1>Future Home of Fliss' Play Button</h1>
      </div>
      <Footer />
    </div>
  );
};
