import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };
  if (auth)
    return (
      <div>
        <img
          alt="logo"
          src="https://www.simicart.com/blog/wp-content/uploads/eCommerce-logo-1.jpg"
          className="logo"
        />
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/signup" onClick={logoutHandler}>
              {"Logout " + `(${JSON.parse(auth)?.name})`}
            </Link>
          </li>
        </ul>
      </div>
    );
  else
    return (
      <div>
        <img
          alt="logo"
          src="https://www.simicart.com/blog/wp-content/uploads/eCommerce-logo-1.jpg"
          className="logo"
        />
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    );
}
