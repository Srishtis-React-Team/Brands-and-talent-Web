import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import FindCreators from "../views/FindCreators";
import GetBooked from "../views/GetBooked";
import Pricing from "../views/pricing";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/find-creators" element={<FindCreators />} />
      <Route path="/get-booked" element={<GetBooked />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  );
}

export default Routing;
