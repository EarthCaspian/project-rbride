import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      
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
              <Link className="nav-link" to={"/"}>
                Rent Now
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
                Services
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/"}>
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/"}>
                    Another action
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to={"/"}>
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
            
          </ul>
         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li><button className="btn btn-outline-primary me-2" type="button">Login</button></li>
            <li><button className="btn btn-outline-secondary me-2" type="button">Register</button></li>
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
