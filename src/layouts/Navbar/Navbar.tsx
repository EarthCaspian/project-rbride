import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../../store/cartSlice";

type Props = {};

const Navbar = (props: Props) => {

  const cartState = useSelector((state:any) => state.cart)

  const dispatch = useDispatch()

  const handleClear = () => {
    dispatch(clearCart())
  }

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary fixed-top"
      
    >
      <div className="container">
        <Link to={"/"} className="navbar-brand">
          <img
            src="/images/roboride.jpeg"
            alt="Bootstrap"
            width="30"
            height="30"
            className="d-inline-block align-text-top me-2"
          />
          RoboRide Rental Services
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/cars"}>
                Cars
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/booknow"}>
                Book Now
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/"}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Rentals
              </Link>
              <ul className="dropdown-menu">
                {cartState.cartItems.map((item: any, index: number) => (
                  <li key={index}>
                    <Link className="dropdown-item" to={`/car-details/${item.car.id}`}>
                    {item.car.model.brand.name} {item.car.model.name} <button className="btn btn-info text-white">{item.quantity}</button>
                    </Link>
                  </li>
                ))}
                  <li><hr className="dropdown-divider"/></li>
                  <li><button className="btn btn-success ms-2" onClick={handleClear}>Clear Selections</button></li>
            </ul>
            </li>
            
          </ul>
         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li><Link className="btn btn-outline-primary me-2" to={"/login"} type="button">Login</Link></li>
            <li><Link className="btn btn-outline-secondary me-2" to={"/register"} type="button">Register</Link></li>
         </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
