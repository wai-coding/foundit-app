import { Link } from "react-router-dom";

import logo from "../assets/foundit-logo.svg";
import profileLogo from "../assets/profile-icon.png";

const Navbar = ({ showFavorites, onFavoritesClick }) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <Link to="/">
            <img src={logo} alt="Foundit logo" className="logo-img" />
          </Link>
        </div>

        <nav className="nav-center">
          <Link to="/">Home</Link>
          <Link to="/sell">Sell</Link>
        </nav>

        <div className="nav-right">
          <button
            className={`nav-fav-btn ${showFavorites ? "active" : ""}`}
            onClick={onFavoritesClick}
            aria-label="Favorites"
          >
            ♥
          </button>
          <img src={profileLogo} alt="Profile" className="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
