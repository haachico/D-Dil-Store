import { NavLink } from "react-router-dom";
import logoImg from "./logo.png";

const Header = () => {
  return (
    <div className="header">
      <NavLink to="/">
        {" "}
        <img src={logoImg} alt="D-Dil-Dtore Logo" className="logo" />
      </NavLink>
      <nav>
        <NavLink to="/home" style={{ letterSpacing: "2px" }}>
          Explore
        </NavLink>
        <NavLink to="host">
          <i class="fa-solid fa-info"></i>
        </NavLink>
        <NavLink to="wishlist">
          <i class="fa-solid fa-heart"></i>
        </NavLink>
        <NavLink to="cart">
          <i class="fa-solid fa-cart-shopping"></i>
        </NavLink>
        <NavLink to="auth">
          <i class="fa-solid fa-user"></i>
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
