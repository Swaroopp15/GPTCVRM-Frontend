import React, { useState } from 'react';
import SideBarItem from './SideBarItem';
import { FaChalkboardTeacher, FaInfoCircle, FaUserGraduate, FaUsersCog, FaHome, FaUniversity, FaBars, FaTimes } from 'react-icons/fa';
import { ImLab } from 'react-icons/im';
import { MdWorkOutline, MdSchool, MdEventNote, MdNotifications, MdSettings } from 'react-icons/md';

export default function SideBar() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className="lg:hidden fixed top-24 left-4 z-30 p-2 rounded-md bg-red-700 text-white shadow-lg"
      >
        {isMobileSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-20 h-screen pt-16 flex flex-col w-64 bg-gradient-to-b from-red-800 to-red-900 shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="px-5 py-4 border-b border-red-700 flex items-center">
            <FaHome className="text-white mr-3 text-lg" />
            <h2 className="text-lg font-semibold text-white">Admin Dashboard</h2>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            <ul className="space-y-2">
              <SideBarItem title="Dashboard" to="dashboard" icon={<FaHome className="text-lg" />} onClick={() => setIsMobileSidebarOpen(false)} />
              <SideBarItem title="Departments" to="departments" icon={<FaUniversity className="text-lg" />} onClick={() => setIsMobileSidebarOpen(false)} />
              <SideBarItem title="Committees" to="committees" icon={<FaUsersCog className="text-lg" />} onClick={() => setIsMobileSidebarOpen(false)} />
              <SideBarItem title="Faculty" to="faculty" icon={<FaChalkboardTeacher className="text-lg" />} onClick={() => setIsMobileSidebarOpen(false)} />
              <SideBarItem title="Students" to="students" icon={<FaUserGraduate className="text-lg" />} onClick={() => setIsMobileSidebarOpen(false)} />
              <SideBarItem title="College Info" to="college-info" icon={<FaInfoCircle className="text-lg" />} onClick={() => setIsMobileSidebarOpen(false)} />
              <SideBarItem title="Results" to="results" icon={<MdSchool className="text-lg" />} onClick={() => setIsMobileSidebarOpen(false)} />
              <SideBarItem title="Placements" to="placements" icon={<MdWorkOutline className="text-lg" />} onClick={() => setIsMobileSidebarOpen(false)} />
              <SideBarItem title="Labs" to="labs" icon={<ImLab className="text-lg" />} onClick={() => setIsMobileSidebarOpen(false)} />
              <SideBarItem title="Events" to="events" icon={<MdEventNote className="text-lg" />} onClick={() => setIsMobileSidebarOpen(false)} />
              <SideBarItem title="Notifications" to="notifications" icon={<MdNotifications className="text-lg" />} onClick={() => setIsMobileSidebarOpen(false)} />
            </ul>
          </nav>

          <div className="px-3 pb-4">
            <SideBarItem title="Settings" to="settings" icon={<MdSettings className="text-lg" />} onClick={() => setIsMobileSidebarOpen(false)} />
          </div>
        </div>
      </aside>

      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-10 bg-black bg-opacity-50" onClick={() => setIsMobileSidebarOpen(false)} />
      )}
    </>
  );
}