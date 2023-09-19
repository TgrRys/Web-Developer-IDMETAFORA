import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Table() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8081/task")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate(); // Use useNavigate to handle navigation

  const handleAddTaskClick = () => {
    navigate("/addtask"); // Navigate to AddTask without specifying userId in the URL
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama Task</th>
            <th scope="col">Status</th>
            <th scope="col">Users</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id_task}>
              <th scope="row">{index + 1}</th>
              <td>{item.nama_task}</td>
              <td>{item.id_status}</td>
              <td>
                <span>
                  User: {item.id_user}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="btn btn-primary" onClick={handleAddTaskClick}>
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Table;
