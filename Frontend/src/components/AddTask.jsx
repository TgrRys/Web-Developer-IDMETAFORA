import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AddTask() {
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("");
  const [statuses, setStatuses] = useState([]);
  const userId = sessionStorage.getItem("selectedUserId"); // Mengambil id_user dari sessionStorage
  const [showAlert, setShowAlert] = useState(false); // State untuk menampilkan/menyembunyikan alert

  useEffect(() => {
    fetch("http://localhost:8081/status")
      .then((res) => res.json())
      .then((data) => {
        setStatuses(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = () => {
    fetch("http://localhost:8081/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama_task: taskName,
        id_status: status,
        id_user: userId, // Menggunakan userId dari sessionStorage
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Task added successfully:", data);
        setShowAlert(true); // Menampilkan alert setelah berhasil menambahkan tugas
        setTimeout(() => {
          setShowAlert(false); // Menghilangkan alert setelah beberapa detik
          // Navigasi ke halaman "Table" setelah menghilangkan alert
          window.location.href = "/";
        }, 3000); // Menghilangkan alert setelah 3 detik (3000 milidetik)
      })
      .catch((err) => {
        console.error("Error adding task:", err);
      });
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
              value={status}
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
          >
            Add Task
          </button>
          {showAlert && (
            <div
              className="alert alert-success mt-3"
              role="alert"
            >
              Task added successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddTask;
