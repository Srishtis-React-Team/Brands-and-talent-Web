import React, { useEffect, useState } from "react";
import "../assets/css/resources.css";
import Header from "../layout/header.js";
import Footer from "../layout/Footer.js";
const Resources = () => {
  const [data, setDate] = useState([]);
  useEffect(() => {}, []);
  let condition;
  const [question_1, selectQuestion1] = useState(true);
  const [question_2, selectQuestion2] = useState(false);
  const [question_3, selectQuestion3] = useState(false);
  const resorcesBanner1 = require("../assets/images/resources/Group 3960.png");
  const resorcesBanner2 = require("../assets/images/resources/Group 3961.png");
  const talentGroup_1 = require("../assets/images/resources/Group 4.png");
  const talentGroup_2 = require("../assets/images/resources/Group 5.png");
  const talentGroup_3 = require("../assets/images/resources/Group 6.png");
  const talentGroup_4 = require("../assets/images/resources/Group 6.png");
  const checkIcon = require("../assets/icons/check-square.png");
  const plus = require("../assets/icons/plus-square.png");
  const [caseList, setCaseList] = useState([]);

  function handleForms(e) {
    console.log(e, "e");
    if (e == "question_1") {
      selectQuestion1(!question_1);
    }
    if (e == "question_2") {
      selectQuestion2(!question_2);
    }
  }

  useEffect(() => {
    setCaseList([
      {
        id: 1,
        photo: talentGroup_1,
        name: "Alexander",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        isFavorite: false,
        location: "Australia",
        booked: "3 Jobs Booked",
        rating: 4,
      },
      {
        id: 2,
        photo: talentGroup_2,
        name: "william",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        location: "America",
        booked: "3 Jobs Booked",
        isFavorite: false,
        rating: 3,
      },
      {
        id: 3,
        photo: talentGroup_3,
        name: "Michael",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        location: "Canada",
        booked: "6 Jobs Booked",
        isFavorite: false,
        rating: 5,
      },
      {
        id: 4,
        photo: talentGroup_4,
        name: "Andrea",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        isFavorite: false,
        location: "Russia",
        booked: "150 Jobs Booked",
        rating: 1,
      },
    ]);
  }, []);
  return (
    <>
      <Header />
      <section>
        <div className="popular-header" style={{ marginTop: "64px" }}>
          <div className="header-title">Resources</div>
          {/* <div className="header-menu">
            <div>Home</div>
            <div>Resources</div>
          </div> */}
        </div>
      </section>
      <div className="container-fluid">
        <div className="resources-main">
          <div className="resources">
            <div className="resource-wrapper">
              <div className="resource-content-wrapper">
                <div className="resource-name">
                  Pellentesque ac eleifend diam, a finibus dolor
                </div>
                <div className="resource-description space">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  varius nisl et pretium mattis. Vivamus ullamcorper justo sed
                  dignissim placerat. Duis viverra ligula quis magna vestibulum
                  ultricies. Fusce feugiat ultricies pulvinar.
                </div>
                <div className="resource-description space">
                  Phasellus vestibulum leo sed tincidunt pretium. In eget tortor
                  orci. Integer non nibh a libero interdum feugiat quis sed
                  elit. Curabitur imperdiet lacinia justo at cursus. Nam mauris
                  lectus, varius id orci et, condimentum ultricies felis.
                  Pellentesque commodo a massa et tempor. Interdum et malesuada
                  fames ac ante ipsum primis in faucibus.
                </div>
              </div>
              <div className="resource-image-wrapper">
                <img className="resource-image" src={resorcesBanner2}></img>
              </div>
            </div>
            <div className="resource-wrapper top-space">
              <div className="resource-image-wrapper">
                <img className="resource-image" src={resorcesBanner1}></img>
              </div>
              <div className="resource-content-wrapper">
                <div className="resource-name">
                  Pellentesque ac eleifend diam, a finibus dolor
                </div>
                <div className="resource-description space">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  varius nisl et pretium mattis. Vivamus ullamcorper justo sed
                  dignissim placerat. Duis viverra ligula quis magna vestibulum
                  ultricies. Fusce feugiat ultricies pulvinar.
                </div>
                <div className="resource-description space">
                  Phasellus vestibulum leo sed tincidunt pretium. In eget tortor
                  orci. Integer non nibh a libero interdum feugiat quis sed
                  elit. Curabitur imperdiet lacinia justo at cursus. Nam mauris
                  lectus, varius id orci et, condimentum ultricies felis.
                  Pellentesque commodo a massa et tempor. Interdum et malesuada
                  fames ac ante ipsum primis in faucibus.
                </div>
              </div>
            </div>
            <div className="tabs-section">
              <div className="title">Meet The Team</div>
              <div className="team-description">
                Phasellus vestibulum leo sed tincidunt pretium. In eget tortor
                orci. Integer non nibh a libero interdum feugiat quis sed elit.
                Curabitur imperdiet lacinia justo at cursus.
              </div>
            </div>

            <div className="container-fluid team-members-section">
              <div className="gallery-section">
                <div className="case-study-main">
                  {caseList?.map((item) => {
                    return (
                      <div className="case-wrapper">
                        <div className="">
                          <img className="case-img" src={item.photo}></img>
                        </div>
                        <div className="gallery-content">
                          <div className="content">
                            <div className="case-study-name">{item.name}</div>
                            <div className="case-study-address">
                              {item.address}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Resources;
