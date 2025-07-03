import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from "../organizerComponents/Sidebar"
const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <div className='ml-0 md:ml-64'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard