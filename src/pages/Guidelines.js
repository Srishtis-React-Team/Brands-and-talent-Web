import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import "../assets/css/guidelines.css";
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
      <div class="bt-container">
        <p class="bt-updated-date">Updated: 12 May 2024</p>
        <p class="bt-intro">
          Welcome to Brands & Talent (BT)! Our platform is a vibrant community
          where creators, influencers, talent, brands, and clients come together
          to collaborate and showcase their talents. To ensure a positive and
          inclusive experience for all members of our community, we have
          established the following Community Guidelines:
        </p>

        <h2 class="bt-heading">1. Respect and Professionalism</h2>
        <p class="bt-paragraph">
          1.1. Treat all members of the Brands & Talent community with respect
          and professionalism. Harassment, bullying, hate speech,
          discrimination, and other forms of disrespectful behavior will not be
          tolerated.
        </p>
        <p class="bt-paragraph">
          1.2. Be mindful of your language and conduct when interacting with
          other users on the platform. Constructive feedback and criticism are
          encouraged, but personal attacks or insults are not acceptable.
        </p>

        <h2 class="bt-heading">2. Authenticity and Transparency</h2>
        <p class="bt-paragraph">
          2.1. Be honest and transparent in your interactions on the Brands &
          Talent platform. Do not misrepresent yourself, your skills, or your
          work.
        </p>
        <p class="bt-paragraph">
          2.2. Disclose any sponsored content or paid promotions in accordance
          with applicable laws and regulations.
        </p>

        <h2 class="bt-heading">3. Intellectual Property</h2>
        <p class="bt-paragraph">
          3.1. Respect the intellectual property rights of others. Do not
          upload, post, or otherwise transmit any content that infringes on the
          copyrights, trademarks, or other intellectual property rights of third
          parties.
        </p>
        <p class="bt-paragraph">
          3.2. Only upload content that you have the right to use and share. If
          you use content created by others, be sure to obtain the necessary
          permissions or licenses.
        </p>

        <h2 class="bt-heading">4. Compliance with Laws and Regulations</h2>
        <p class="bt-paragraph">
          4.1. Comply with all applicable laws, regulations, and legal
          obligations when using the Brands & Talent platform. This includes but
          is not limited to laws related to copyright, defamation, privacy, and
          data protection.
        </p>
        <p class="bt-paragraph">
          4.2. Do not engage in any illegal or fraudulent activities on the
          platform.
        </p>

        <h2 class="bt-heading">5. Professional Conduct</h2>
        <p class="bt-paragraph">
          5.1. Maintain a professional demeanor when conducting business on the
          Brands & Talent platform. Honor your commitments, meet deadlines, and
          communicate promptly and respectfully with clients, brands, and other
          users.
        </p>
        <p class="bt-paragraph">
          5.2. If any disputes arise between users, attempt to resolve them
          amicably and in good faith. If necessary, seek assistance from Brands
          & Talent support staff to mediate the dispute.
        </p>

        <h2 class="bt-heading">6. Reporting Violations</h2>
        <p class="bt-paragraph">
          6.1. If you encounter any content or behavior on the Brands & Talent
          platform that violates these Community Guidelines or our Terms of
          Service, please report it to us immediately using the appropriate
          reporting mechanisms and ‘’contact us’’ feature provided on the
          platform.
        </p>
        <p class="bt-paragraph">
          6.2. We take reports of violations seriously and will investigate them
          promptly. Users who violate our Community Guidelines may be subject to
          disciplinary action, including account suspension or termination.
        </p>

        <h2 class="bt-heading">7. Conclusion</h2>
        <p class="bt-paragraph">
          7.1. By participating in the Brands & Talent community, you agree to
          abide by these Community Guidelines and our Terms of Service.
          Together, we can create a welcoming and supportive environment where
          every member can thrive and shine.
        </p>
        <p class="bt-paragraph">
          Thank you for being a part of the Brands & Talent community. We look
          forward to seeing your creativity soar!
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Guidelines;
