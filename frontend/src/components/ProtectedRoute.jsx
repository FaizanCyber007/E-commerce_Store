import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector(s => s.user.userInfo);
  return user ? children : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
