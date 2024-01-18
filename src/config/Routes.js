import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import FindCreators from "../views/FindCreators";
import GetBooked from "../views/GetBooked";
import Pricing from "../views/pricing";
import Resources from "../views/resources";
import Register from "../views/Register";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/find-creators" element={<FindCreators />} />
      <Route path="/get-booked" element={<GetBooked />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
  );
}

export default Routing;
