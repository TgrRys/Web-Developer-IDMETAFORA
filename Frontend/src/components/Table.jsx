import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Table() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8081/task')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  // Simpan id_user yang ditekan di sessionStorage
  const handleUserClick = (userId) => {
    sessionStorage.setItem('selectedUserId', userId);
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
                {/* Simpan id_user yang ditekan di sessionStorage */}
                <Link
                  to={`/addtask/${item.id_task}`}
                  onClick={() => handleUserClick(item.id_user)}
                >
                  {item.id_user}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
