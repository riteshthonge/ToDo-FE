import React, { useContext, useState, useEffect } from "react";
import signupImg from "../assetes/task2.png";
import { ToastContainer, toast } from "react-toastify";
import { PushSpinner } from "react-spinners-kit";
import { AppContext } from "../context/AppContext";
import UserNavbar from "../components/UserNavbar";
import axios from "axios";

function AddTask() {
  const { backendUrl, userData, getAllTasks, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",


  });

  // Load draft
  useEffect(() => {
    const saved = localStorage.getItem("taskFormData");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("taskFormData", JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timeout);
  }, [formData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isDraftField = (key) => formData[key] && localStorage.getItem("taskFormData");

  const renderDraftLabel = (key) =>
    isDraftField(key) ? (
      <span className="text-success ms-2" style={{ fontSize: "0.8rem" }}>
        Draft
      </span>
    ) : null;

  const submitHandler = async () => {
    setLoading(true);
    const { title, description, dueDate, rating } = formData;

    if (!title || !description) {
      toast.error("Please fill in required fields");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/add-task`,
        {
          title,
          description,
         
          dueDate: dueDate || null,
          rating: rating || null,
          user_id: userData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message || "Task added successfully");
        await getAllTasks?.();
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          rating: "",
        });
        localStorage.removeItem("taskFormData");
      } else {
        toast.error(data.message || "Error adding task");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while adding task");
    }

    setLoading(false);
  };

  return (
    <div>
    <ToastContainer />
      <div >
        <h2 className="text-start  mt-5">
          <strong className="p-2">Create a New Task</strong>
        </h2>

        <div className="container p-3">
          <form
            className="d-flex p-3 container rounded position-relative"
            style={{ zIndex: 2 }}
          >
            <div className="container col-md-7">
              <div className="form-floating mb-3 position-relative">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Task Title"
                  value={formData.title}
                  onChange={handleChange}
                />
                <label htmlFor="title" className="fs-6">
                  Task Title {renderDraftLabel("title")}
                </label>
              </div>

              <div className="form-floating mb-3 position-relative">
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Task Description"
                  style={{ height: "120px" }}
                  value={formData.description}
                  onChange={handleChange}
                />
                <label htmlFor="description" className="fs-6">
                  Description {renderDraftLabel("description")}
                </label>
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
                <label htmlFor="dueDate" className="fs-6">
                  Due Date {renderDraftLabel("dueDate")}
                </label>
              </div>

            

              <div className="text-center my-2">
                <button
                  className="btn btn-success w-75 text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    submitHandler();
                  }}
                >
                  {loading ? (
                    <div className="container d-flex justify-content-center align-items-center">
                      <PushSpinner size={30} color="white" />
                    </div>
                  ) : (
                    "Add Task"
                  )}
                </button>
              </div>
            </div>

            <div className="container mx-auto my-auto loginImageContainer">
              <img
                id="signUpImage"
                src={signupImg}
                className="img-fluid"
                alt="Task Form Illustration"
                style={{ width: "80%", height: "80%" }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
