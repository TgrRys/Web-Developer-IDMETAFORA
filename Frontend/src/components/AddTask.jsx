import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AddTask() {
  const [taskName, setTaskName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statuses, setStatuses] = useState([]);
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get("userId");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8081/user_statuses/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStatuses(data);
        } else {
          console.error("Data received is not an array:", data);
        }
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setIsLoading(false));
  }, [userId]);

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleStatusChange = (e) => {
    const selectedIdStatus = e.target.value;
    setSelectedStatus(selectedIdStatus);
  };

  const handleSubmit = () => {
    setIsLoading(true);

    if (!taskName || !selectedStatus) {
      console.error("Please fill in all fields and select a status");
      setIsLoading(false);
      return;
    }

    fetch("http://localhost:8081/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama_task: taskName,
        id_user: userId,
        id_status: parseInt(selectedStatus),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Task created successfully") {
          setShowAlert(true);
          setTaskName("");
          setSelectedStatus("");
          // Navigate to the root ("/") after successfully adding a task
          navigate("/");
        } else {
          console.error("Error creating task:", data);
        }
      })
      .catch((err) => console.error("Error creating task:", err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Add Task</h2>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Nama Task</label>
            <input
              type="text"
              className="form-control"
              value={taskName}
              onChange={handleTaskNameChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status:</label>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="form-select"
            >
              <option value="">Select Status</option>
              {statuses.map((statusOption) => (
                <option
                  key={statusOption.id_status}
                  value={statusOption.id_status}
                >
                  {statusOption.nama_status}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Adding Task..." : "Add Task"}
          </button>
          {showAlert && (
            <div className="alert alert-success mt-3" role="alert">
              Task added successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddTask;
