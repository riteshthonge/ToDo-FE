import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import UserNavbar from "../components/UserNavbar";
import taskImg from "../assetes/task1.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStar } from "react-icons/fa"; 

const AllTasks = () => {
  const { userData, allTasks, navigate, backendUrl, token, getAllTasks } =
    useContext(AppContext);

  const handleRate = async (task_id, ratingValue) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-rating`,
        {
          task_id,
          rating: ratingValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Task rated successfully!");
        getAllTasks();
      } else {
        toast.error("Rating update failed.");
      }
    } catch (err) {
      toast.error("Failed to rate task.");
    }
  };

  
  const handleDelete = async (task_id) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/user/delete-task`,
        { task_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        getAllTasks();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Failed to delete task.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Server error while deleting.");
    }
  };

  if (!allTasks || allTasks.length === 0) {
    return (
      <div>
        <div className="text-center mt-5 text-muted">No tasks available.</div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }

  return (
    <div>
      <UserNavbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container h-100">
        <div className="row g-4">
          {allTasks.map((task) => (
            <div className="col-md-6 col-lg-4" key={task._id}>
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <img
                  src={taskImg}
                  alt="task"
                  className="card-img-top rounded-top-4"
                />

                <div className="card-body d-flex flex-column text-start">
                  <div>
                    <h5 className="card-title text-success text-center fw-bold mb-3">
                      {task.title}
                    </h5>

                    <p className="card-text mb-2">
                      <strong>Description:</strong> {task.description}
                    </p>

                    <p className="card-text mb-2">
                      <strong>Due Date:</strong>{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </p>

                    <p className="card-text mb-2">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          task.status.toLowerCase() === "completed"
                            ? "bg-success"
                            : task.status.toLowerCase() === "in-progress"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {task.status}
                      </span>
                    </p>

                    <div className="d-flex align-items-center mt-2">
                      <span className="me-2 fw-semibold">Rating:</span>
                      {[1, 2, 3, 4, 5].map((val) => (
                        <FaStar
                          key={val}
                          size={22}
                          className="me-1"
                          color={val <= task.rating ? "#ffc107" : "#e4e5e9"}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRate(task._id, val)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between gap-2 mt-4">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-outline-success"
                      onClick={() =>
                        navigate("/update-task", { state: { task } })
                      }
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
