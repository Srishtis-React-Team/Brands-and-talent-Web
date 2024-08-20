import React from "react";
import "./App.css";
import "./assets/css/findcreators.css"
import "./assets/css/resources.css"
import "./assets/css/brand-dashboard.css"
import Routing from "./config/Routes";
import CookieConsent from "./views/CookieConsent"; 

function App() {
  return (
    <>
      <Routing />
      <CookieConsent/>
    </>
  );
}

export default App;
