import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import InfoSection from "../components/InfoSection";
import AboutSection from "../components/AboutSection";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { useState } from "react";
import {
  homeObjOne,
  homeObjTwo,
  homeObjThree,
} from "../components/AboutSection/Data";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <InfoSection />
      <AboutSection {...homeObjOne} />
      <AboutSection {...homeObjTwo} />
      <Services />
      <AboutSection {...homeObjThree} />
      <Footer />
    </>
  );
};

export default Home;
