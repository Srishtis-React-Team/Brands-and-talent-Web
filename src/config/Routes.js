import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../views/Dashboard";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  )
}

export default Routing