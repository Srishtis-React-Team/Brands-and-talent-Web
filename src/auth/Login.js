import React, { useState, useEffect } from "react";

const Login = () => {
  const btLogo = require("../assets/icons/Group 56.png");
  const importIcon = require("../assets/icons/instagram.png");
  const mailIcon = require("../assets/icons/mail.png");
  const lockiIcon = require("../assets/icons/lock.png");
  const eyeOff = require("../assets/icons/eye-off.png");
  return (
    <>
      <div className="modal-wrapper">
        <div className="modal-content">
          <div className="modal-header header-wrapper">
            <img className="modal-logo" src={btLogo}></img>
          </div>
          <div className="modal-body modal-content ">
            <div className="step-title">Log In</div>
            <div className="step-selection">
              <div className="select-wrapper email-input">
                <img src={mailIcon}></img>
                <input
                  type="password"
                  className="select-text absolute-input"
                  placeholder="Email"
                />
              </div>
              <div className="select-wrapper">
                <div>
                  <img src={lockiIcon}></img>
                  <input
                    type="password"
                    className="select-text absolute-input"
                    placeholder="Password"
                  />
                </div>
                <img src={eyeOff}></img>
              </div>
              <div className="select-wrapper">
                <div>
                  <img src={lockiIcon}></img>
                  <input
                    type="password"
                    className="select-text absolute-input"
                    placeholder="Confirm-Password"
                  />
                </div>
                <img src={eyeOff}></img>
              </div>
              <div className="stroke-wrapper">
                <div className="stroke-div"></div>
                <div className="or-signup">Or Signup with</div>
                <div className="stroke-div"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
