import React from 'react';
import { NavLink } from 'react-router';

export default function SideBarItem({ icon, title, to, onClick }) {
  return (
    <li>
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => 
          `flex items-center p-3 text-sm font-medium rounded-lg transition-all duration-200
          ${isActive 
            ? 'bg-red-600 text-white shadow-md' 
            : 'text-red-100 hover:bg-red-700 hover:text-white'
          }`
        }
      >
        <span className="w-6 flex justify-center">
          {icon}
        </span>
        <span className="ml-3 whitespace-nowrap">{title}</span>
      </NavLink>
    </li>
  );
}