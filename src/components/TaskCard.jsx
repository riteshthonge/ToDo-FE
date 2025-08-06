import React from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const TaskCard = ({ task, backendUrl, getAllTasks }) => {
  const handleRate = async (ratingValue) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/user/update-rating`, {
        task_id: task._id,
        rating: ratingValue,
      });
      if (data.success) {
        toast.success("Task rated successfully!");
        getAllTasks(); 
      }
    } catch (err) {
      toast.error("Failed to rate task.");
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>
        <p>Status: <strong>{task.status}</strong></p>

        <div className="d-flex align-items-center">
          <span className="me-2">Rating:</span>
          {[1, 2, 3, 4, 5].map((val) => (
            <FaStar
              key={val}
              size={22}
              className="me-1"
              color={val <= task.rating ? "#ffc107" : "#e4e5e9"}
              style={{ cursor: "pointer" }}
              onClick={() => handleRate(val)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
