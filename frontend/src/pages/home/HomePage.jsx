import Header from "../../components/header";
import Footer from "../../components/Footer";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="home-content">
        <h1>Welcome to the Home Page!</h1>
      </div>
      <Footer />
    </div>
  );
};
