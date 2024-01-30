import React, { useEffect, useState } from "react";
import "../assets/css/pricing.css";
import Header from "../layout/header.js";
import Footer from "../layout/Footer.js";
const Pricing = () => {
  const [data, setDate] = useState([]);
  useEffect(() => {}, []);
  const [plan1_Selected, selectPlan1] = useState(false);
  const [plan2_Selected, selectPlan2] = useState(true);
  const [plan3_Selected, selectPlan3] = useState(false);
  const checkIcon = require("../assets/icons/check-square.png");
  const checkShield = require("../assets/icons/check-shield.png");
  const greyCircle = require("../assets/icons/grey-filled-circle.png");
  const filledCircle = require("../assets/icons/pink-filled-circle.png");
  function handleForms(e) {
    console.log(e, "e");
    if (e == "plan-1") {
      selectPlan1(true);
    } else {
      selectPlan1(false);
    }
    if (e == "plan-2") {
      selectPlan2(true);
    } else {
      selectPlan2(false);
    }
    if (e == "plan-3") {
      selectPlan3(true);
    } else {
      selectPlan3(false);
    }
  }
  return (
    <>
      <Header />
      <section>
        <div className="popular-header">
          <div className="header-title">Popular Models</div>
          <div className="header-menu">
            <div>Home</div>
            <div>Models</div>
          </div>
        </div>
      </section>
      <div className="plans-section">
        <div className="plans-wrapper free-plans">
          <div className="premium-text">Premium</div>
          <div className="plan-value">Free</div>
          <div className="plan-validity">Forever</div>
          <div className="choose-btn free-btn">Choose plan</div>
          <div className="include">WHAT'S INCLUDED</div>
          <div className="included-things">
            <div>1. Create a profile </div>
            <div>2. Verified profile</div>
            <div>3. portfolio</div>
            <div>4. 3 photos</div>
            <div>5. 1 videos</div>
            <div>6. Bio</div>
            <div>7. CV</div>
            <div>8. Get Invited to a Job</div>
            <div>9. Apply to unlimited jobs</div>
            <div>10. Chat with thebrands (clients)directly</div>
          </div>
          <div className="learn-btn">Learn More</div>
        </div>
        <div className="plans-wrapper pro-plans">
          <div className="plan-name">
            Pro (Recommended)
            <div className="pro-gift">Gift Subscription</div>
          </div>
          <div className="plan-value">$7 per / month</div>
          <div className="save-plan">
            Annual (save 22.2%) US$ 7/month <span>US$ 108</span>  US $84/year
          </div>
          <div className="choose-btn pro-btn">Choose plan</div>
          <div className="include">WHAT'S INCLUDED</div>
          <div className="included-things">
            <div>1. Create a profile </div>
            <div>2. Verified profile</div>
            <div>3. portfolio</div>
            <div>4. 20 photos</div>
            <div>5. 6 videos</div>
            <div>6. Bio</div>
            <div>7. CV</div>
            <div>8. Get Invited to a Job</div>
            <div>9. Apply to unlimited jobs</div>
            <div>10. Chat with thebrands (clients)directly</div>
          </div>
          <div className="learn-btn">Learn More</div>
        </div>
        <div className="plans-wrapper premium-plans">
          <div className="plan-name">
            Premium
            <div className="premium-gift">Gift Subscription</div>
          </div>
          <div className="plan-value">$17 per / month</div>
          <div className="save-plan">
            Annual (save 29.2%) US$ 17/month <span>US$ 288</span>  US$ 204/year
          </div>
          <div className="choose-btn premium-btn">Choose plan</div>
          <div className="include">WHAT'S INCLUDED</div>
          <div className="included-things">
            <div>1. Create a profile </div>
            <div>2. Verified profile</div>
            <div>3. portfolio</div>
            <div>4. 20 photos</div>
            <div>5. 6 videos</div>
            <div>6. Bio</div>
            <div>7. CV</div>
            <div>8. Get Invited to a Job</div>
            <div>9. Apply to unlimited jobs</div>
            <div>10. Chat with thebrands (clients)directly</div>
          </div>
          <div className="learn-btn">Learn More</div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Pricing;
