import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";
const Guidelines = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />{" "}
      <section className="topSpace mb-2">
        <div className="popular-header">
          <div className="container">
            <div className="header-title">Community Guidelines</div>
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

export default Guidelines;
