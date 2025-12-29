import { Link } from "react-router-dom";

import logo from "../assets/foundit-logo.svg";
import profileLogo from "../assets/profile-icon.png";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <img src={logo} alt="Foundit logo" className="logo-img" />
        </div>

        <nav className="nav-center">
          <Link to="/">Home</Link>
          <Link to="/sell">Sell</Link>
        </nav>

        <div className="nav-right">
          <img src={profileLogo} alt="Profile" className="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
