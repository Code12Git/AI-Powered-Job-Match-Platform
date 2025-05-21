import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";

 import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import RequireAuth from "../hooks/RequireAuth";
 
const Routing = () => {

 
  return (
    <Routes>
      <Route element={<RequireAuth />}>
      <Route path='/' element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/jobs" element={<Jobs />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routing;
