import React from 'react'
import "./AdminPanel.css"
import { Link, Outlet } from 'react-router-dom'

type Props = {}

const AdminPanel = (props: Props) => {
  return (
    <div>
    <div className="admin-sidebar mt-5">
      <div className="admin-links">
        <h2>Admin Menu</h2>
        <hr />
        <h3>Car Ops</h3>
        <Link to="/admin/addCar">Add Car</Link>
        <hr />
        <h3>Brand Ops</h3>
        <Link to="/admin/addBrand">Add Brand</Link>
        <hr />
        <h3>Model Ops</h3>
        <Link to="/admin/addModel">Add Model</Link>
      </div>
    </div>
    <div className="admin-content mt-5">
      
      <Outlet/>
      
    </div>
  </div>
)
  
}

export default AdminPanel