import React from 'react'
import { AddCarForm } from '../../components/AdminPanelCards/AddCarForm'
import "./AdminPanel.css"
import { Link, Outlet } from 'react-router-dom'

type Props = {}

const AdminPanel = (props: Props) => {
  return (
    <div>
    <div className="admin-sidebar mt-5">
      <div className="admin-links">
        <h2>Admin Menu</h2>
        <Link to="/admin/addCar">Add Car</Link>
        
      </div>
    </div>
    <div className="admin-content mt-5">
      {/* <AddCarForm /> */}
      <Outlet/>
      
    </div>
  </div>
)
  
}

export default AdminPanel