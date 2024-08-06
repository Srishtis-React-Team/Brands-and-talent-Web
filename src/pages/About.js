import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";

const About = () => {
  return (
    <>
      <Header />{" "}
      <section style={{ marginTop: "64px" }}>
        <div className="popular-header">
          <div className="container">
            <div className="header-title">About Us</div>
          </div>
        </div>
      </section>
      <section className="abtWraper">
        <div className="container">
          <div className="topCont pt-5 pb-0">
            <div className="text-center">
              <h2 className="maintitles">About Brands & Talent</h2>
              <div className="widthParg">
                <p className="descp">
                  Welcome to{" "}
                  <strong>
                    Brands & Talent (BT), where creators, influencers, and
                    talent take center stage in a platform designed to amplify
                    their voices and showcase their work to the world. Our
                    journey began out of a deep understanding of the challenges
                    faced by talented individuals like you in reaching global
                    audiences and connecting directly with brands and clients.
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <div className="contSpc pt-3 pb-5">
            <div className="row textAlg mb-5">
              <div className="col-md-6 descp">
                At Brands & Talent, we recognized the need for a platform that
                empowers creators with full independence and control over their
                careers.{" "}
                <strong>
                  Unlike other existing platforms, we believe in giving you the
                  autonomy to choose the tasks you want to take on, set your own
                  rates, and decide how and when you want to work. With us, you
                  keep 100% of your earnings—no middlemen, no commissions, and
                  no hidden fees. It's your talent, your terms.
                </strong>
                <br />
                <br />
                Moreover, in a world where advanced technology poses a risk to
                human creators, we stand firm in our commitment to putting real
                human talent first.{" "}
                <strong>
                  While AI and other emerging technologies continue to evolve,
                  we're dedicated to ensuring that creators are not replaced but
                  rather amplified
                </strong>
                . Our platform serves as a sanctuary for human creativity, where
                your work is celebrated and easily accessible to brands and
                clients seeking your unique talents.
              </div>
              <div className="col-md-6">
                <img
                  className="img-fluid"
                  src={
                    "https://brandsandtalent.com//backend/uploads/060b5e10-128d-455e-9a63-9d4bd1531031.webp"
                  }
                ></img>
              </div>
            </div>

            <div className="row textAlg mt-3 mb-5">
              <div className="col-md-6 ">
                <img
                  className="img-fluid"
                  src={
                    "https://brandsandtalent.com//backend/uploads/76f0ef01-9a84-4459-90f6-b2c7aaa9f1e3.webp"
                  }
                ></img>
              </div>
              <div className="col-md-6 descp">
                We understand that{" "}
                <strong>
                  time is precious, which is why our platform is designed to
                  streamline the hiring process for brands and clients. Say
                  goodbye to endless searches for verified creators and
                  influencers—Brands & Talent provides a hassle-free solution to
                  connect you with the talent you need, instantly.
                </strong>
                <br />
                <br />
                As we embark on this journey together,{" "}
                <strong>
                  we pledge to continually innovate our processes and search
                  engine technology, leveraging AI to the benefit of real human
                  creators and influencers.
                </strong>{" "}
                Brands & Talent is more than just a platform; it's a community
                built on the belief that every creator deserves to shine.
                <br />
                <br />
                Join us at Brands & Talent and discover a world where your
                creativity knows no bounds.{" "}
                <strong>
                  Welcome to a new era of empowerment and opportunity.
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
