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
        <Link to="/admin/getAllCars">Get All Cars</Link>
        <Link to="/admin/getCarById">Get Car By ID</Link>
        <hr />
        <h3>Brand Ops</h3>
        <Link to="/admin/addBrand">Add Brand</Link>
        <Link to="/admin/getAllBrands">Get All Brands</Link>
        <Link to="/admin/getBrandById">Get Brand By ID</Link>
        <hr />
        <h3>Model Ops</h3>
        <Link to="/admin/addModel">Add Model</Link>
        <Link to="/admin/getAllModels">Get All Models</Link>
        <Link to="/admin/getModelById">Get Model By ID</Link>
      </div>
    </div>
    <div className="admin-content mt-5">
      
      <Outlet/>
      
    </div>
  </div>
)
  
}

export default AdminPanel