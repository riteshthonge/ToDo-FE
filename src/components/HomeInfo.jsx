import React from "react";
import img from "../assetes/project3.png";
import img1 from "../assetes/task2.png";
import img2 from "../assetes/wellness3.png";

import emergency from "../assetes/Dairy/emergency.png";

import { useNavigate } from "react-router-dom";

function HomeInfo() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="row align-items-center justify-content-between mb-5">
        <div
          data-aos="fade-right"
          className="col-md-6 text-center text-md-start"
        >
         <h2 className="mb-4">
  Task Management Platform Built for <strong>Productive</strong> Living
</h2>
<p className="mb-4">
  Organize, track, and manage your daily tasks with ease including work, personal goals, and more all designed to help you stay focused, efficient, and in control of your productivity.
</p>

        </div>
        <div data-aos="fade-left" className="col-md-6 text-center">
          <img
            src={img}
            alt="Project Tracker"
            style={{
              maxWidth: "80%",
              height: "80%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Feature Section */}
      <div className="text-center mb-5">
      <h2>
  Take your <strong>Task Management</strong> to the next level!
</h2>

      </div>

     <div className="row justify-content-center">
  {/* Feature 1 */}
  <div data-aos="fade-up" className="col-md-4 mb-4">
    <div className="card h-100 shadow rounded-4 p-3 border-0 text-center">
      <img
        src={img}
        className="card-img-top mx-auto"
        alt="User-Friendly Interface"
        style={{ height: "200px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h5 className="card-title">User-Friendly Interface</h5>
        <p className="card-text">
          Easily add, update, and manage your tasks with a clean and intuitive interface designed for productivity.
        </p>
      </div>
    </div>
  </div>

  {/* Feature 2 */}
  <div data-aos="fade-up" className="col-md-4 mb-4">
    <div className="card h-100 shadow rounded-4 p-3 border-0 text-center">
      <img
        src={img2}
        className="card-img-top mx-auto"
        alt="Real-Time Auto-Save"
        style={{ height: "200px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h5 className="card-title">Real-Time Auto-Save</h5>
        <p className="card-text">
          Your tasks are automatically saved as you work,so you never lose track of your important to-dos.
        </p>
      </div>
    </div>
  </div>

  {/* Feature 3 */}
  <div data-aos="fade-up" className="col-md-4 mb-4">
    <div className="card h-100 shadow rounded-4 p-3 border-0 text-center">
      <img
        src={img1}
        className="card-img-top mx-auto"
        alt="Task Customization"
        style={{ height: "200px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h5 className="card-title">Personalized Task Planning</h5>
        <p className="card-text">
          Customize your to-do lists by priority, category, and deadline to match your goals and workflow.
        </p>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}

export default HomeInfo;
