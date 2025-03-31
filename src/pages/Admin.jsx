import React from 'react'
import SideBar from '../components/admin/Sidebar/SideBar'
import { Outlet } from 'react-router'

function Admin() {
  return (
    <div className="flex bg-white pt-16">
    <SideBar />
    <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-0" id="sidebarBackdrop" />
    <div id="main-content" className="flex-1 min-h-screen bg-gray-50 p-6 lg:ml-64 overflow-y-auto">
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px
-8">
          <div className="bg-white shadow-md sm:rounded-lg p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  </div>
  )
}

export default Admin