import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Table from './components/Table';
import AddTask from './components/AddTask';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/addtask/:taskId" element={<AddTask/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
