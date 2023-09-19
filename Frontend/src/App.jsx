import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Table from './components/Table';
import AddTask from './components/AddTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/addtask" element={<AddTask />} />
      </Routes>
    </Router>
  );
}

export default App;
