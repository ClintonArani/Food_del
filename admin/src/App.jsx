import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Navigate, Route, Routes } from "react-router-dom";
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  const url = "https://food-del-ten-tau.vercel.app";

  // Sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar open/close
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  // Close sidebar (used when clicking on a sidebar link)
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div>
      <ToastContainer />
      <Navbar toggleSidebar={toggleSidebar} />
      <hr />
      <div className="app-content" onClick={closeSidebar}>
        {/* Pass sidebarOpen and closeSidebar to Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <Routes>
          <Route path="/" element={<Dashboard url={url} />} />
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
          <Route path='/dashboard' element={<Dashboard url={url} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
