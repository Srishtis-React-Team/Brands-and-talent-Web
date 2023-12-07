import React from 'react'
import '../assets/css/dashboard.css'
import Slider from '../components/Slider';

const Dashboard = () => {
   const btLogo = require('../assets/icons/Group 56.png');
   const searchLogo = require('../assets/icons/search (1).png');
   const starIcon = require('../assets/icons/star.png');
   const whiteStar = require('../assets/icons/white_star.png');
   const checkMark = require('../assets/icons/check-circle.png');
   const lockIcon = require('../assets/icons/lock.png');
   const gridLogo = require('../assets/icons/4243313_ux_basic_app_menu_icon 1.png')
   const gents = require('../assets/images/gents.png');
   const girl = require('../assets/images/girl.png');
   const female = require('../assets/images/female.png');
   const fashion = require('../assets/images/fashion.png');
   const adidasIcon = require('../assets/icons/6539fea9ad514fe89ff5d7fc_adidas.png');
   const ubisoftIcon = require('../assets/icons/6539fd74ad514fe89ff48cdd_ubisoft.png');
   const wppIcon = require('../assets/icons/651508c575f862fac120d7b1_wpp.webp');
   const lorealIcon = require('../assets/icons/6539e8f83c874a7714db103c_Loreal 1.webp');
   const havasIcon = require('../assets/icons/6539e8f8ac5a3259e7f64ef8_Havas_logo 3.webp');
   const joseIcon = require('../assets/icons/6539e8f8fe903bed35dc07f8_jose-cuervo-logo-black-and-white 1.webp');
   const calvinIcon = require('../assets/icons/6539ea694436eb9715c9cba3_image 10.png');
   const socialIcons = require('../assets/icons/Social.png');
   const roundProfile = require('../assets/icons/round-profile.png');
   const quoteIcon = require('../assets/icons/9044931_quotes_icon 1.png');

    return (
       <>
         <div className='container-fluid'> 
           <div className='header'>
             <div className='icon'>
             <img src={btLogo}></img>
             </div>
             <div className='menu-items'>
                <div>Home</div>
                <div>Find Creators</div>
                <div>Get Booked</div>
                <div>Pricing</div>
                <div>Learn</div>
             </div>
             <div className='header-functions'>
                  <div>
                     <img src={searchLogo}></img>
                  </div>
                  <div>Login</div>
                  <div className='signup'>Sign up</div>
                  <div className='gridLogo'>
                  <img src={gridLogo}></img>
                  </div>
             </div>
           </div>
           <div className='section-1'>
               <div className='find-work'>
                  <div>Find work as a model</div>
                  <div>Unlock Your Gateway to Modeling Opportunities.</div>
                  <div className='Join-wrapper center'> 
                     <div>Join Now</div>
                  </div>
               </div>
               <div className='find-work'>
                  <div>Find models and talents</div>
                  <div>Discover Your Ideal Model: Connecting Visions with Talent.</div>
                  <div className='white-joinnow center'>
                     <div>Join Now</div>
                  </div>
               </div>
           </div>
           <div className='tabs-section'>
              <div className='title'>Popular Models</div>
              <div className='tabs'>
               <div>Fashion</div>
               <div>Plus sized</div>
               <div>Real people</div>
               <div>Unique</div>
              </div>
           </div>
           <div className='gallery-section'>
              <div className='gallery-warpper'>
                <img src={gents}></img>
                <div className='gallery-content'>
                  <div className='content'>
                     <div className='name'>Alexander</div>
                     <div className='address'>Copenhagen, Denmark</div>
                  </div>
                  <div className='rating'>
                     <img src={starIcon}></img>
                     <img src={starIcon}></img>
                     <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className='gallery-warpper'>
                <img src={gents}></img>
                <div className='gallery-content'>
                  <div className='content'>
                     <div className='name'>Alexander</div>
                     <div className='address'>Copenhagen, Denmark</div>
                  </div>
                  <div className='rating'>
                     <img src={starIcon}></img>
                     <img src={starIcon}></img>
                     <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className='gallery-warpper'>
                <img src={gents}></img>
                <div className='gallery-content'>
                  <div className='content'>
                     <div className='name'>Alexander</div>
                     <div className='address'>Copenhagen, Denmark</div>
                  </div>
                  <div className='rating'>
                     <img src={starIcon}></img>
                     <img src={starIcon}></img>
                     <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className='gallery-warpper'>
                <img src={gents}></img>
                <div className='gallery-content'>
                  <div className='content'>
                     <div className='name'>Alexander</div>
                     <div className='address'>Copenhagen, Denmark</div>
                  </div>
                  <div className='rating'>
                     <img src={starIcon}></img>
                     <img src={starIcon}></img>
                     <img src={starIcon}></img>
                  </div>
                </div>
              </div>
           </div>
          <div className='center'> 
          <div className='Join-wrapper center'> 
                     <div>Find More</div>
            </div>
          </div>
          <div className='title'>Our Community</div>
          </div>    
          <div className='cards'>
            <div className='card-wrapper'>
               <div className='count'>5,258,451</div>
               <div className='cards-text'>Models in community</div>
            </div>
            <div className='card-wrapper'>
               <div className='count'>5,258,451</div>
               <div className='cards-text'>Industry Professionals</div>
            </div>
            <div className='card-wrapper'>
               <div className='count'>5,258,451</div>
               <div className='cards-text'>Agencies</div>
            </div>
          </div>
          <div className='title'>Prioritizing Your Well-being</div>
          <div className='cards'>
            <div className='card-wrapper'>
               <div className='card-picture center'>
                 <img src={ checkMark}></img>
               </div>
               <div className='cards-description'>
               Every professional member undergoes thorough verification by our team.
               </div>
            </div>
            <div className='card-wrapper'>
            <div className='card-picture center'>
                 <img src={ lockIcon}></img>
               </div>
               <div className='cards-description'>
               Cutting-edge tools designed to thwart scammers at every turn.
               </div>
            </div>
            <div className='card-wrapper'>
            <div className='card-picture center'>
                 <img src={ whiteStar }></img>
               </div>
               <div className='cards-description'>
               Rely on community reviews for an extra layer of assurance.
               </div>
            </div>
          </div>
          <div className='title'>Case studies</div>
          <div className='gallery-section'>
              <div className='gallery-warpper'>
                <img src={gents} className="case-images"></img>
                <div className='gallery-content'>
                  <div className='content'>
                     <div className='name'>Lorem ipsum dolor sit</div>
                     <div className='address'>Copenhagen, Denmark</div>
                  </div>
                </div>
              </div>
              <div className='gallery-warpper'>
                <img src={gents} className="case-images"></img>
                <div className='gallery-content'>
                  <div className='content'>
                     <div className='name'>Lorem ipsum dolor sit</div>
                     <div className='address'>Copenhagen, Denmark</div>
                  </div>
                </div>
              </div>
              <div className='gallery-warpper'>
                <img src={gents} className="case-images"></img>
                <div className='gallery-content'>
                  <div className='content'>
                     <div className='name'>Lorem ipsum dolor sit</div>
                     <div className='address'>Copenhagen, Denmark</div>
                  </div>
                </div>
              </div>
              <div className='gallery-warpper'>
                <img src={gents} className="case-images"></img>
                <div className='gallery-content'>
                  <div className='content'>
                     <div className='name'>Lorem ipsum dolor sit</div>
                     <div className='address'>Copenhagen, Denmark</div>
                  </div>
                </div>
              </div>
           </div>
           <div className='center'> 
          <div className='Join-wrapper center'> 
                     <div>Find More</div>
            </div>
          </div>
         <div className='carousel-section'>    
             <div className='carousel-title center'>
             Success Stories
             </div>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
               <div className="carousel-inner">
                 <div className="carousel-item active">
                  <div className='carousel-wrapper'>
                     <div className='box-one'>
                     <div>
                       <img className='carousel-img' src={gents}></img>
                     </div>
                     <div className='box-content'>
                        <div className='quote'>
                        <img src={quoteIcon}></img>
                        </div>
                        <div className='carousel-description'>
                          A great photographer's tool for online castings that really works!
                        </div>
                        <div className='profile-section'>
                            <div>
                              <img src={roundProfile}></img>
                            </div>
                            <div className='profile-content'>
                            <div className='profile-name'>
                               Dorothy 
                            </div>
                            <div className='profile-info'>
                            Lorem ipsum dolor  
                            </div>
                            </div>
                        </div>
                     </div>
                     </div>
                     <div className='box-one'>
                     <div>
                       <img className='carousel-img' src={female}></img>
                     </div>
                     <div className='box-content'>
                        <div className='quote'>
                        <img src={quoteIcon}></img>
                        </div>
                        <div className='carousel-description'>
                          A great photographer's tool for online castings that really works!
                        </div>
                        <div className='profile-section'>
                            <div>
                              <img src={roundProfile}></img>
                            </div>
                            <div className='profile-content'>
                            <div className='profile-name'>
                               Dorothy 
                            </div>
                            <div className='profile-info'>
                            Lorem ipsum dolor  
                            </div>
                            </div>
                        </div>
                     </div>
                     </div>
                  
                  </div>
                 </div>
                 <div className="carousel-item">
                  <div className='carousel-wrapper'>
                     <div className='box-one'>
                     <div>
                       <img className='carousel-img' src={girl}></img>
                     </div>
                     <div className='box-content'>
                        <div className='quote'>
                        <img src={quoteIcon}></img>
                        </div>
                        <div className='carousel-description'>
                          A great photographer's tool for online castings that really works!
                        </div>
                        <div className='profile-section'>
                            <div>
                              <img src={roundProfile}></img>
                            </div>
                            <div className='profile-content'>
                            <div className='profile-name'>
                               Dorothy 
                            </div>
                            <div className='profile-info'>
                            Lorem ipsum dolor  
                            </div>
                            </div>
                        </div>
                     </div>
                     </div>
                     <div className='box-one'>
                     <div>
                       <img className='carousel-img' src={fashion}></img>
                     </div>
                     <div className='box-content'>
                        <div className='quote'>
                        <img src={quoteIcon}></img>
                        </div>
                        <div className='carousel-description'>
                          A great photographer's tool for online castings that really works!
                        </div>
                        <div className='profile-section'>
                            <div>
                              <img src={roundProfile}></img>
                            </div>
                            <div className='profile-content'>
                            <div className='profile-name'>
                               Dorothy 
                            </div>
                            <div className='profile-info'>
                            Lorem ipsum dolor  
                            </div>
                            </div>
                        </div>
                     </div>
                     </div>
                  
                  </div>
                 </div>
                
               
               </div>
               <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                 <span className="visually-hidden">Previous</span>
               </button>
               <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
                 <span className="visually-hidden">Next</span>
               </button>
             </div>
          </div>


          <div className='title'>Trusted by renowned brands</div>
          <div className='brands-section'>
            <div>
               <img src={adidasIcon}></img>
            </div>
            <div>
               <img src={ubisoftIcon}></img>
            </div>
            <div>
               <img src={wppIcon}></img>
            </div>
            <div>
               <img src={lorealIcon}></img>
            </div>
            <div>
               <img src={joseIcon}></img>
            </div>
            <div>
               <img src={calvinIcon}></img>
            </div>
            <div>
               <img src={havasIcon}></img>
            </div>
          </div>
          <div className='form-section'>
            <div className='form-title'>Get Discovered</div>
            <div className='form-fields'>
               <input className='form-control' placeholder='First Name'></input>
               <input className='form-control'  placeholder='Email Address'></input>
               <div className='subscribe-btn'>Subscribe Now</div>
            </div>
          </div>
          <div className='footer-section'>
            <div className='footer-wrapper'>
               <div className='footer-icon'>
                <img src={btLogo}></img>
               </div>
               <div className='company-info'>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam placerat dapibus sapien, pellentesque elementum dolor finibus sed.
               </div>
               <div className='social-medias'>
                      <img src={socialIcons}></img>
               </div> 
            </div>
            <div className='footer-wrapper'>
               <div className='footer-title'>Company</div>
               <div>Home</div>
               <div>Find Creators</div>
               <div>Pricing</div>
               <div>Learn</div>
            </div>          
            <div className='footer-wrapper'>
               <div  className='footer-title'>Help</div>
               <div>Customer Support</div>
               <div>Help & FAQ</div>
               <div>Terms & Conditions</div>
               <div>Pricing</div>
            </div>          
            <div className='footer-wrapper'>
               <div  className='footer-title'>Resources</div>
               <div>Featured Lists</div>
               <div>New Faces</div>
               <div>How to - Blog</div>
               <div>Youtube Playlist</div>
            </div>          
          </div>
          <div className='copyright-section'>
            <div>
               © Copyright 2023 Brandsandtalent All Right Reserved.</div>
          </div>
       </>
    )
}  



export default Dashboard