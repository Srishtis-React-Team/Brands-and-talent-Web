import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import reportWebVitals from "./reportWebVitals";

import { StyledEngineProvider } from "@mui/material";

// basename="/project/brandsandtalent/"basename="/project/brandsandtalent/"
// https://hybrid.sicsglobal.com/project/brandsandtalent/
// "homepage": "https://hybrid.sicsglobal.com/project/brandsandtalent/",

ReactDOM.render(
  <BrowserRouter basename="/project/brandsandtalent/">
    <GoogleOAuthProvider clientId="301564582988-fei7hvri7467l3jkru3ggn7f7tvohg0j.apps.googleusercontent.com">
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </GoogleOAuthProvider>
    ;
  </BrowserRouter>,
  document.getElementById("root")
);
reportWebVitals();
