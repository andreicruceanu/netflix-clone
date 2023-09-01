import React from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import bg from "../../assets/images/bg.jpg";
import HeroSlide from "../../components/heroSlide/HeroSlide";
const HomePage = () => {
  return (
    <div className="home">
      <Navbar />
      <HeroSlide />
    </div>
  );
};

export default HomePage;
