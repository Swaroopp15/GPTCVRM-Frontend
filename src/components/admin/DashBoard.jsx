import { BookImageIcon, Building2 } from 'lucide-react';
import React from 'react'
import { FaBell, FaBook, FaBriefcase, FaCalendarAlt, FaChalkboardTeacher, FaChartLine, FaCog, FaFlask, FaUniversity, FaUserGraduate, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router';

function DashBoard() {
  const adminCards = [
    {
      title: "Departments",
      description: "Manage academic departments and programs",
      icon: <FaUniversity className="text-3xl text-red-600" />,
      link: "/admin/departments",
      bgColor: "bg-red-50"
    },
    {
      title: "Committees",
      description: "Manage college committees and members",
      icon: <FaUsers className="text-3xl text-blue-600" />,
      bgColor: "bg-blue-50",
      link: "/admin/committees"
    },
    {
      title: "Faculty",
      description: "Manage faculty members and staff",
      icon: <FaChalkboardTeacher className="text-3xl text-green-600" />,
      link: "/admin/faculty",
      bgColor: "bg-green-50"
    },
    {
      title: "Labs",
      description: "Manage laboratory facilities and equipment",
      icon: <FaFlask className="text-3xl text-purple-600" />,
      link: "/admin/labs",
      bgColor: "bg-purple-50"
    },
    {
      title: "Placements",
      description: "Manage student placement records",
      icon: <FaBriefcase className="text-3xl text-yellow-600" />,
      link: "/admin/placements",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Results",
      description: "Manage student examination results",
      icon: <FaChartLine className="text-3xl text-indigo-600" />,
      link: "/admin/results",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Library",
      description: "Manage college Library resources",
      icon: <FaBook className="text-3xl text-teal-600" />,
      link: "/admin/library",
      bgColor: "bg-teal-50"
    },
    {
      title: "Events",
      description: "Manage college Ebooks and resources",
      icon: <BookImageIcon className="text-3xl text-fuchsia-600" />,
      link: "/admin/ebooks",
      bgColor: "bg-pink-50"
    },
    {
      title: "Events",
      description: "Manage college events and activities",
      icon: <FaCalendarAlt className="text-3xl text-pink-600" />,
      link: "/admin/events",
      bgColor: "bg-pink-50"
    },
    {
      title: "Facilities",
      description: "Manage college Facilites",
      icon: <Building2 className="text-3xl text-pink-600"/>,
      link: "/admin/facility",
      bgColor: "bg-pink-50"
    },
    {
      title: "Notifications",
      description: "Manage system notifications",
      icon: <FaBell className="text-3xl text-orange-600" />,
      link: "/admin/notifications",
      bgColor: "bg-orange-50"
    },
    {
      title: "Admissions",
      description: "Manage student admissions",
      icon: <FaUserGraduate className="text-3xl text-teal-600" />,
      link: "/admin/admissions",
      bgColor: "bg-teal-50"
    },
    {
      title: "Settings",
      description: "System configuration and settings",
      icon: <FaCog className="text-3xl text-gray-600" />,
      link: "/admin/settings",
      bgColor: "bg-gray-50"
    }
  ];
  const navigate = useNavigate();
  return (
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
                 onClick={() => navigate(card.link)}
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
        </main>
  )
}

export default DashBoard