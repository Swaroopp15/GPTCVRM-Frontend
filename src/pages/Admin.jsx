import React from 'react';
import SideBar from '../components/admin/Sidebar/SideBar';
import { FaUniversity, FaUsers, FaFlask, FaBriefcase, FaChartLine, FaCalendarAlt, FaBell, FaUserGraduate, FaChalkboardTeacher, FaCog } from 'react-icons/fa';

function Admin() {
  const adminCards = [
    {
      title: "Departments",
      description: "Manage academic departments and programs",
      icon: <FaUniversity className="text-3xl text-red-600" />,
      bgColor: "bg-red-50"
    },
    {
      title: "Committees",
      description: "Manage college committees and members",
      icon: <FaUsers className="text-3xl text-blue-600" />,
      bgColor: "bg-blue-50"
    },
    {
      title: "Faculty",
      description: "Manage faculty members and staff",
      icon: <FaChalkboardTeacher className="text-3xl text-green-600" />,
      bgColor: "bg-green-50"
    },
    {
      title: "Labs",
      description: "Manage laboratory facilities and equipment",
      icon: <FaFlask className="text-3xl text-purple-600" />,
      bgColor: "bg-purple-50"
    },
    {
      title: "Placements",
      description: "Manage student placement records",
      icon: <FaBriefcase className="text-3xl text-yellow-600" />,
      bgColor: "bg-yellow-50"
    },
    {
      title: "Results",
      description: "Manage student examination results",
      icon: <FaChartLine className="text-3xl text-indigo-600" />,
      bgColor: "bg-indigo-50"
    },
    {
      title: "Events",
      description: "Manage college events and activities",
      icon: <FaCalendarAlt className="text-3xl text-pink-600" />,
      bgColor: "bg-pink-50"
    },
    {
      title: "Notifications",
      description: "Manage system notifications",
      icon: <FaBell className="text-3xl text-orange-600" />,
      bgColor: "bg-orange-50"
    },
    {
      title: "Admissions",
      description: "Manage student admissions",
      icon: <FaUserGraduate className="text-3xl text-teal-600" />,
      bgColor: "bg-teal-50"
    },
    {
      title: "Settings",
      description: "System configuration and settings",
      icon: <FaCog className="text-3xl text-gray-600" />,
      bgColor: "bg-gray-50"
    }
  ];

  return (
    <div className="flex bg-gray-50 pt-16">
      <SideBar />
      <div className="bg-gray-900 opacity-50 hidden fixed inset-1 z-0" id="sidebarBackdrop" />
      <div id="main-content" className="flex-1 min-h-screen p-6 lg:ml-64 overflow-y-auto">
        <main>
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-red-700 to-red-800 shadow-lg rounded-lg p-6 mb-8 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-2">Welcome to the administration panel. Manage all aspects of the college system.</p>
          </div>
          
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {adminCards.map((card, index) => (
              <div 
                key={index}
                className={`${card.bgColor} rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200`}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {card.icon}
                    <h2 className="ml-3 text-xl font-bold text-gray-800">{card.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <button className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-300">
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats Section */}
          {/* <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
              <h3 className="text-gray-500 font-medium">Total Departments</h3>
              <p className="text-3xl font-bold mt-2">12</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
              <h3 className="text-gray-500 font-medium">Active Faculty</h3>
              <p className="text-3xl font-bold mt-2">84</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border-l-4 border-red-500">
              <h3 className="text-gray-500 font-medium">Current Students</h3>
              <p className="text-3xl font-bold mt-2">1,250</p>
            </div>
          </div> */}
        </main>
      </div>
    </div>
  );
}

export default Admin;