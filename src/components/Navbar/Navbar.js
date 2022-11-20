import React from "react";
import { logout } from "../../services/auth.service";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const logoutMethod = () => {
    logout();
  };

  const userStateName = useSelector((state) => state.user.name);

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
      <a className="navbar-brand">Bhojan</a>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbardrop"
              data-toggle="dropdown"
              style={{ color: "white" }}
            >
              {userStateName}
            </a>
            <div className="dropdown-menu">
              <div className="dropdown-item" style={{ cursor: "pointer" }}>
                Profile
              </div>
              <div className="dropdown-item" style={{ cursor: "pointer" }}>
                Settings
              </div>
              <div
                className="dropdown-item"
                style={{ cursor: "pointer" }}
                onClick={logoutMethod}
              >
                Logout
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
