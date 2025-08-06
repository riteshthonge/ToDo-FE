import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context/AppContext";
import { PushSpinner } from "react-spinners-kit";
import task from "../assetes/task.png";

function UpdateTask() {
  const { backendUrl, token, getAllTasks } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const taskData = location.state?.task;

  useEffect(() => {
    if (taskData) {
      setTitle(taskData.title || "");
      setDescription(taskData.description || "");
      setDueDate(taskData.dueDate ? taskData.dueDate.split("T")[0] : "");
      setStatus(taskData.status || "");
    } else {
      toast.error("No task data found");
      navigate("/user");
    }
  }, [taskData, navigate]);

  const updateHandler = async () => {
    if (!title || !description || !dueDate || !status) {
      toast.warning("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-task`,
        {
          task_id: taskData._id,
          title,
          description,
          dueDate,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Task updated successfully!");
        await getAllTasks();
       setTimeout(() => {
  navigate("/user");
}, 1000);
      } else {
        toast.error(data.message || "Update failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container-fluid d-flex flex-column min-vh-100">
        <UserNavbar />

        <div className="container mt-5 flex-grow-1">
          <h2 className="text-start my-4">
            <strong>Update Task</strong>
          </h2>

          <div className="row align-items-center shadow-sm rounded p-3">
            {/* Left: Form */}
            <div className="col-md-7">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="taskTitle"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <label htmlFor="taskTitle">Task Title</label>
                </div>

                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="description"
                    placeholder="Task Description"
                    style={{ height: "100px" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <label htmlFor="description">Description</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    placeholder="Due Date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                  <label htmlFor="dueDate">Due Date</label>
                </div>

                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Not Started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <label htmlFor="status">Status</label>
                </div>

                <div className="text-center mt-3">
                  <button
                    className="btn btn-primary w-75"
                    type="submit"
                    onClick={updateHandler}
                  >
                    {loading ? (
                      <PushSpinner size={25} color="white" />
                    ) : (
                      "Update Task"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Image */}
            <div className="col-md-5 text-center">
              <img
                src={task}
                alt="task illustration"
                className="img-fluid p-3"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default UpdateTask;
