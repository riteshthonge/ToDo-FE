import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { Login, UserDashBord, Home, Signup, UpdateTask } from "./screens/index";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      easing: "ease-in-out", // Default easing for animations
      once: false, // Whether animation should happen only once - while scrolling down
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);
  return (
    <div className="page-body">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserDashBord />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/update-task" element={<UpdateTask />} />
      </Routes>
    </div>
  );
}

export default App;
