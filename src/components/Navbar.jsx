import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <Link className="navbar-brand text-success fs-5 font-bold" to="/"> <h3>To Do</h3> </Link>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="#">Home</Link>
            </li>
          
           
          </ul>
          <div className="d-flex">
            <Link to="/signup" className="btn btn-outline-primary me-2">Sign Up</Link>
           
          </div>
          <div className="d-flex">
            <Link to="/login" className="btn btn-outline-success me-2">Log In</Link>
           
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
