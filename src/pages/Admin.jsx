import React from 'react'
import SideBar from '../components/admin/Sidebar/SideBar'

function Admin() {
  return (
    <div className="flex bg-white pt-16">
    <SideBar />
    <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-0" id="sidebarBackdrop" />
    <div id="main-content" className="flex-1 min-h-screen bg-gray-50 p-6 lg:ml-64 overflow-y-auto">
      <main>
      </main>
    </div>
  </div>
  )
}

export default Admin