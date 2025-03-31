import React from 'react'
import SideBarItem from './SideBarItem'
import { FaChalkboardTeacher, FaInfoCircle,FaUserGraduate, FaUsersCog } from 'react-icons/fa'
import { ImLab } from 'react-icons/im'
import { MdCorporateFare,MdWork } from 'react-icons/md'


export default function SideBar() {
  return (
    <aside id="sidebar" className="fixed hidden z-20 h-full top-14 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
      <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 bg-white divide-y space-y-1">
            <ul className="space-y-2 pb-2">
            <SideBarItem title={"Departments"} to={"details"} icon={<MdCorporateFare className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"/>} />
            <SideBarItem title={"Committees"} to={"mybooks"} icon={<FaUsersCog className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"/>} />
            <SideBarItem title={"Faculty"} to={"deliveries"} icon={<FaChalkboardTeacher className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"/>} />
            <SideBarItem title={"College Info"} to={"addbook"} icon={<FaInfoCircle className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"/>} />
            <SideBarItem title={"Results"} to={"transactions"} icon={<FaUserGraduate className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"/>} />
            <SideBarItem title={"Placements"} to={"deliveries"} icon={<MdWork className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"/>} />
            <SideBarItem title={"Labs"} to={"deliveries"} icon={<ImLab className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"/>} />
            <SideBarItem title={"Admissions"} to={"deliveries"} icon={<FaUsersCog className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"/>} />

            </ul>
          </div>
        </div>
      </div>
    </aside>
  )
}
