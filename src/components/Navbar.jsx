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
          <a href="#">Explore</a>
          <a href="#">Collections</a>
          <a href="#">Studio</a>
          <a href="#">About</a>
        </nav>

        <div className="nav-right">
          <img src={profileLogo} alt="Profile" className="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
