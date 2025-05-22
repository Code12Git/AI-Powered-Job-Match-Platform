import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import RequireAuth from "../hooks/RequireAuth";
import Match from "../pages/Match";
import PublicRoute from "../hooks/PublicRoute"; 

const Routing = () => {
  return (
    <Routes>
      {/* Public routes - accessible without auth */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
      {/* Protected routes - require auth */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/recommendations" element={<Match />} />
      </Route>
    </Routes>
  );
};

export default Routing;