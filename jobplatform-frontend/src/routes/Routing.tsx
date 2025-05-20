import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../pages/Login";

import { useEffect, useState } from "react";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

const Routing = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!(localStorage.getItem("user") && localStorage.getItem("token"))
  );

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      setIsAuthenticated(true);
      navigate("/"); 
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routing;
