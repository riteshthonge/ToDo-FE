import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function UserNavbar() {
  const { backendUrl, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/logout`);
      if (data.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
         localStorage.removeItem("allTasks");
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const userInitial = userData?.name
    ? userData.name.charAt(0).toUpperCase()
    : "U";

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {/* Left: Brand logo */}
        <Link className="navbar-brand text-success fs-5" to="/user">
          To Do
        </Link>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right: User & logout */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <div className="d-flex align-items-center gap-3 ms-auto">
            <div
              className="rounded-circle bg-success text-white d-flex justify-content-center align-items-center"
              style={{ width: "40px", height: "40px", fontWeight: "bold" }}
              title={userData?.name}
            >
              {userInitial}
            </div>

            <button className="btn btn-outline-danger" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
