import React, { useEffect, useState } from "react";
import "../assets/css/resources.css";
import Header from "../layout/header.js";
import Footer from "../layout/Footer.js";
const Resources = () => {
  useEffect(() => {}, []);
  const [question_1, selectQuestion1] = useState(true);
  const [question_2, selectQuestion2] = useState(false);
  const [caseList, setCaseList] = useState([]);

  useEffect(() => {
    setCaseList([
      {
        id: 1,
        photo:
          "https://brandsandtalent.com/backend/uploads/1098fe83-e450-4f8a-bacd-a6054d58cef2.png",
        name: "Alexander",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        isFavorite: false,
        location: "Australia",
        booked: "3 Projects Booked",
        rating: 4,
      },
      {
        id: 2,
        photo:
          "https://brandsandtalent.com/backend/uploads/400ce9f3-ffae-4278-9916-3ed3173383cf.png",
        name: "william",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        location: "America",
        booked: "3 Projects Booked",
        isFavorite: false,
        rating: 3,
      },
      {
        id: 3,
        photo:
          "https://brandsandtalent.com/backend/uploads/e472e377-c3b9-468b-b6d7-cc0fc6585d3f.png",
        name: "Michael",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        location: "Canada",
        booked: "6 Projects Booked",
        isFavorite: false,
        rating: 5,
      },
      {
        id: 4,
        photo:
          "https://brandsandtalent.com/backend/uploads/7b95da22-a37c-4cc1-a7cf-8806351cd543.png",
        name: "Andrea",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        isFavorite: false,
        location: "Russia",
        booked: "150 Projects Booked",
        rating: 1,
      },
    ]);
  }, [caseList]);
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
                <img
                  className="resource-image"
                  src="https://brandsandtalent.com/static/media/abt1.5b3df7cb4e1d8d66a71f.png"
                ></img>
              </div>
            </div>
            <div className="resource-wrapper top-space">
              <div className="resource-image-wrapper">
                <img
                  className="resource-image"
                  src="https://brandsandtalent.com/static/media/abt2.7fb0e7c0e8bee70c4360.png"
                ></img>
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
