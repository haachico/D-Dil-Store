import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { Context } from "..";
import logoImg from "./logo.png";

const Header = () => {
  const { wishlistItems, cartItems } = useContext(Context);
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
          <i class="fa-solid fa-heart wishlistIcon"></i>
          <span className="wishlistBadge">
            {wishlistItems.length > 0 && wishlistItems.length}
          </span>
        </NavLink>
        <NavLink to="cart">
          <i class="fa-solid fa-cart-shopping cartIcon"></i>
          <span className="cartBadge">
            {cartItems.length > 0 && cartItems.length}
          </span>
        </NavLink>
        <NavLink to="auth">
          <i class="fa-solid fa-user"></i>
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
