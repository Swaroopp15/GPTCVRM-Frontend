import React from 'react';
import SideBar from '../components/admin/Sidebar/SideBar';
import { FaUniversity, FaUsers, FaFlask, FaBriefcase, FaChartLine, FaCalendarAlt, FaBell, FaUserGraduate, FaChalkboardTeacher, FaCog } from 'react-icons/fa';
import { Outlet } from 'react-router';

function Admin() {
  

  return (
    <div className="flex bg-gray-50">
      <SideBar />
      <div className="bg-gray-900 opacity-50 hidden fixed inset-1 z-0" id="sidebarBackdrop" />
      <div id="main-content" className="flex-1 min-h-screen lg:ml-64 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;