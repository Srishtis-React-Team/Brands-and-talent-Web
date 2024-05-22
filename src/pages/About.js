import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />{" "}
      <section style={{ marginTop: "64px" }}>
        <div className="popular-header">
          <div className="container">
            <div className="header-title">About Us</div>
            <div className="header-menu">
              <div>Home</div>
              <div>Learn</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
