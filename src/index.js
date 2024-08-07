import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { StyledEngineProvider } from "@mui/material";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const App = lazy(() => import("./App"));

ReactDOM.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="301564582988-fei7hvri7467l3jkru3ggn7f7tvohg0j.apps.googleusercontent.com">
      <StyledEngineProvider injectFirst>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </StyledEngineProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
