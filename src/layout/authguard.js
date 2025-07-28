import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
    const isAuthenticated = !!(localStorage.getItem("token") || localStorage.getItem("brandToken") || localStorage.getItem("currentUserType"));

   // const isAuthenticated = !!(localStorage.getItem("token") || localStorage.getItem("brandToken"));


  if (!isAuthenticated) {
  //  alert("You must be logged in first.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;