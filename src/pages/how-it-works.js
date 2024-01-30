import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      HowItWorks Page under Development
      <Footer />
    </>
  );
};

export default HowItWorks;
