import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      About Us Page under Development
      <Footer />
    </>
  );
};

export default About;
