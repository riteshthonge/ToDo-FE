import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import UserNavbar from "../components/UserNavbar";
import UserServiceCard from "../components/UserServiceCard";
import Footer from "../components/Footer";

function UserDashBord() {
  const { userData } = useContext(AppContext);

  return (
    <>
      <UserNavbar />

      {/* Full screen height container */}
      <div className=" d-flex flex-column align-items-center" style={{ marginTop: "3.5rem" }}>
        <div className="text-center">
          <h2 className="fw-bold">
            Hello <span className="text-success">{userData.name}</span>,
          </h2>
          <h6 className="text-muted">Welcome Back Again.</h6>
        </div>

       
          <UserServiceCard />
        
      </div>
      
    </>
  );
}

export default UserDashBord;
