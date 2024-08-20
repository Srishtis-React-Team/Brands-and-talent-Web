import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { StyledEngineProvider } from "@mui/material";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
// "homepage": "https://brandsandtalent.com",
// "homepage": "https://hybrid.sicsglobal.com/project/brandsandtalent",
// "homepage": "https://dev.brandsandtalent.com",
// "homepage": "https://staging.brandsandtalent.com",

// basename=""

// ReactDOM.render(
//   <BrowserRouter>
//     <GoogleOAuthProvider clientId="301564582988-fei7hvri7467l3jkru3ggn7f7tvohg0j.apps.googleusercontent.com">
//       <StyledEngineProvider injectFirst>
//         <App />
//       </StyledEngineProvider>
//     </GoogleOAuthProvider>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="301564582988-fei7hvri7467l3jkru3ggn7f7tvohg0j.apps.googleusercontent.com">
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

reportWebVitals();
