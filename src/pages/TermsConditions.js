import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import "../assets/css/termsconditions.css";

const TermsConditions = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />{" "}
      <section className="topSpace mb-2">
        <div className="popular-header">
          <div className="container">
            <div className="header-title">Terms & Conditions</div>
            {/* <div className="header-menu">
              <div>Home</div>
              <div>Learn</div>
            </div> */}
          </div>
        </div>
      </section>
      <div className="terms-container">
        <p className="terms-updated-date">Updated: 12 May 2024</p>
        <p className="terms-intro">
          Welcome to Brands & Talent (BT)! By accessing or using our platform,
          you agree to comply with and be bound by the following terms and
          conditions ("Terms"). Please read these Terms carefully before
          accessing or using the Brands & Talent platform.
        </p>

        <h2 className="terms-heading">1. Acceptance of Terms</h2>
        <p className="terms-paragraph">
          1.1. By accessing or using the Brands & Talent platform, you agree to
          be bound by these Terms and all applicable laws and regulations.
        </p>
        <p className="terms-paragraph">
          1.2. If you do not agree to these Terms, you may not access or use the
          Brands & Talent platform.
        </p>

        <h2 className="terms-heading">2. User Accounts</h2>
        <p className="terms-paragraph">
          2.1. In order to access certain features of the Brands & Talent
          platform, you may be required to create a user account.
        </p>
        <p className="terms-paragraph">
          2.2. You are responsible for maintaining the confidentiality of your
          account and password and for restricting access to your account. You
          agree to accept responsibility for all activities that occur under
          your account.
        </p>
        <p className="terms-paragraph">
          2.3. You agree to provide accurate and complete information when
          creating your user account and to update your information as necessary
          to keep it accurate and complete.
        </p>

        <h2 className="terms-heading">3. User Responsibilities</h2>
        <p className="terms-paragraph">
          3.1. You are solely responsible for your use of the Brands & Talent
          platform and for any content that you upload, post, or otherwise
          transmit through the platform.
        </p>
        <p className="terms-paragraph">
          3.2 As a Creative: You are responsible for creating a profile
          showcasing your work, setting your rates, and communicating with
          Brands/Clients directly.
        </p>
        <p className="terms-paragraph">
          3.3 As a Client: You are responsible for searching for creatives,
          reviewing their profiles, and agreeing to their rates before starting
          a project.
        </p>
        <p className="terms-paragraph">
          3.4. You agree not to use the Brands & Talent platform for any
          unlawful purpose or in any way that violates these Terms or the rights
          of others.
        </p>
        <p className="terms-paragraph">
          3.5. You agree not to upload, post, or otherwise transmit any content
          that is unlawful, harmful, threatening, abusive, harassing,
          defamatory, vulgar, obscene, libelous, invasive of another's privacy,
          hateful, or racially, ethnically, or otherwise objectionable. You
          agree not to upload or post any sexually explicit/adult content on the
          platform.
        </p>

        <h2 className="terms-heading">4. Intellectual Property</h2>
        <p className="terms-paragraph">
          4.1. The content on the Brands & Talent platform, including but not
          limited to text, graphics, logos, images, audio clips, and video
          clips, is owned by Brands & Talent or its licensors and is protected
          by copyright, trademark, and other intellectual property laws.
        </p>
        <p className="terms-paragraph">
          4.2. You may not reproduce, modify, distribute, transmit, display,
          perform, or otherwise use any content on the Brands & Talent platform
          without the prior written consent of Brands & Talent.
        </p>

        <h2 className="terms-heading">5. Payments</h2>
        <p className="terms-paragraph">
          5.1. Creators on the Brands & Talent platform are entitled to keep
          100% of their earnings.
        </p>
        <p className="terms-paragraph">
          5.2. Brands & Talent does not charge any middlemen fees or
          commissions.
        </p>
        <p className="terms-paragraph">
          5.3.Subscription fee payments between users and Brands & Talent shall
          be conducted through secure payment gateways provided by Brands &
          Talent.
        </p>

        <h2 className="terms-heading">6. Privacy</h2>
        <p className="terms-paragraph">
          6.1. Your privacy is important to us. Please review our Privacy
          Policy, which explains how we collect, use, and disclose information
          about you when you access or use the Brands & Talent platform.
        </p>

        <h2 className="terms-heading">7. Community Guidelines</h2>
        <p className="terms-paragraph">
          7.1 We foster a respectful and inclusive community. All users are
          expected to comply with our Community Guidelines, which are available
          on the Platform.
        </p>

        <h2 className="terms-heading">8. Termination</h2>
        <p className="terms-paragraph">
          8.1. Brands & Talent reserves the right to suspend or terminate your
          access to the platform at any time and for any reason, with or without
          prior notice.
        </p>
        <p className="terms-paragraph">
          8.2. Upon termination, you will no longer have access to your user
          account or any content that you have uploaded or posted to the Brands
          & Talent platform.
        </p>

        <h2 className="terms-heading">9. Modifications</h2>
        <p className="terms-paragraph">
          9.1. Brands & Talent reserves the right to modify these Terms at any
          time. Any changes to these Terms will be effective immediately upon
          posting on the Brands & Talent platform.
        </p>
        <p className="terms-paragraph">
          9.2. Your continued use of the Brands & Talent platform after any such
          changes constitutes your acceptance of the modified Terms.
        </p>

        <h2 className="terms-heading">10. Limitation of Liability</h2>
        <p className="terms-paragraph">
          10.1. We are not liable for any damages arising from your use of the
          Platform, including but not limited to, lost profits, business
          interruption, or indirect or consequential damages.
        </p>

        <h2 className="terms-heading">11. Governing Law</h2>
        <p className="terms-paragraph">
          11.1. These Terms and any disputes arising out of or relating to these
          Terms or the Brands & Talent platform shall be governed by and
          construed in accordance with the laws of Cambodia.
        </p>

        <h2 className="terms-heading">12. Dispute Resolution</h2>
        <p className="terms-paragraph">
          12.1. Any dispute arising out of or relating to these Terms shall be
          resolved through mediation or negotiation between the user and the
          Brands & Talent. The Brands & Talent executive committee's decision
          shall be final.
        </p>

        <h2 className="terms-heading">13. Contact Us</h2>
        <p className="terms-paragraph">
          13.1. If you have any questions about these Terms, please contact us
          at info@brandsandtalent.com
        </p>

        <p className="terms-conclusion">
          By accessing or using the Brands & Talent platform, you acknowledge
          that you have read, understood, and agree to be bound by these Terms.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;
