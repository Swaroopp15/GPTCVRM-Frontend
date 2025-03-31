import React from 'react'
import { Link } from 'react-router'

export default function SideBarItem({icon, title, to}) {
  return (
    <li>
    <Link to={to} className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
      {icon}
      <span className="ml-3">{title}</span>
    </Link>
  </li>
  )
}
