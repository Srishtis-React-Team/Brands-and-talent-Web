import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import "../assets/css/privacypolicy.css";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />{" "}
      <section className="topSpace mb-2">
        <div className="popular-header">
          <div className="container">
            <div className="header-title">Privacy Policy</div>
            {/* <div className="header-menu">
              <div>Home</div>
              <div>Learn</div>
            </div> */}
          </div>
        </div>
      </section>
      <div class="policy-container">
        <p class="policy-updated-date">Updated: 12 May 2024</p>
        <p class="policy-intro">
          Welcome to Brands & Talent (BT)! This Privacy Policy describes how
          Brands & Talent collects, uses, and protects the information you
          provide when accessing or using our platform. By accessing or using
          the Brands & Talent platform, you consent to the practices described
          in this Privacy Policy.
        </p>

        <h2 class="policy-heading">1. Information We Collect</h2>
        <p class="policy-paragraph">
          1.1. Personal Information: When you create a user account on the
          Brands & Talent platform, we may collect personal information such as
          your name, email address, and payment information.
        </p>
        <p class="policy-paragraph">
          1.2. Content: We may collect information that you upload, post, or
          otherwise transmit through the Brands & Talent platform, including but
          not limited to text, graphics, images, and videos.
        </p>
        <p class="policy-paragraph">
          1.3. Usage Information: We may collect information about your use of
          the Brands & Talent platform, including your interactions with our
          website, the content you view, and the actions you take.
        </p>

        <h2 class="policy-heading">2. How We Use Your Information</h2>
        <p class="policy-paragraph">
          2.1. To Provide Services: We use the information we collect to
          provide, maintain, and improve the Brands & Talent platform, including
          facilitating connections between creators, influencers, talent,
          brands, and clients.
        </p>
        <p class="policy-paragraph">
          2.2. To Communicate: We may use your contact information to
          communicate with you about your account, transactions, and other
          relevant matters related to the Brands & Talent platform.
        </p>
        <p class="policy-paragraph">
          2.3. To Personalize Content: We may use information about your
          preferences and interests to personalize the content and features of
          the Brands & Talent platform.
        </p>

        <h2 class="policy-heading">3. Information Sharing</h2>
        <p class="policy-paragraph">
          3.1. With Other Users: Certain information, such as your username and
          profile information, may be visible to other users of the Brands &
          Talent platform.
        </p>
        <p class="policy-paragraph">
          3.2. With Service Providers: We may share your information with
          third-party service providers who assist us in providing, maintaining,
          and improving the Brands & Talent platform.
        </p>
        <p class="policy-paragraph">
          3.3. For Legal Purposes: We may disclose your information to comply
          with applicable laws, regulations, or legal processes, or to protect
          the rights, property, or safety of Brands & Talent, our users, or
          others.
        </p>

        <h2 class="policy-heading">4. Data Security</h2>
        <p class="policy-paragraph">
          4.1. We take reasonable measures to protect the security of your
          information, including using encryption and other security
          technologies to safeguard your personal information.
        </p>

        <h2 class="policy-heading">5. Data Retention</h2>
        <p class="policy-paragraph">
          5.1. We retain your personal information for as long as necessary to
          fulfill the purposes outlined in this Privacy Policy, unless a longer
          retention period is required or permitted by law.
        </p>

        <h2 class="policy-heading">6. Your Choices</h2>
        <p class="policy-paragraph">
          6.1. You may update, correct, or delete your personal information by
          accessing your account settings on the Brands & Talent platform.
        </p>
        <p class="policy-paragraph">
          6.2. You may opt out of receiving promotional communications from us
          by following the instructions provided in such communications.
        </p>

        <h2 class="policy-heading">7. Children's Privacy</h2>
        <p class="policy-paragraph">
          7.1. The Brands & Talent platform is not intended for use by children
          under the age of 13. We do not knowingly collect personal information
          from children under the age of 13.
        </p>

        <h2 class="policy-heading">8. Changes to this Privacy Policy</h2>
        <p class="policy-paragraph">
          8.1. We may update this Privacy Policy from time to time. Any changes
          to this Privacy Policy will be effective immediately upon posting on
          the Brands & Talent platform.
        </p>

        <h2 class="policy-heading">9. Contact Us</h2>
        <p class="policy-paragraph">
          9.1. If you have any questions or concerns about this Privacy Policy,
          please contact us at info@brandsandtalent.com.
        </p>

        <p class="policy-conclusion">
          By accessing or using the Brands & Talent platform, you acknowledge
          that you have read, understood, and agree to be bound by this Privacy
          Policy.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
