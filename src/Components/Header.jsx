import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Context } from "..";
import logoImg from "./logo.png";

const Header = () => {
  const { wishlistItems, cartItems } = useContext(Context);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  return (
    <div className="header">
      <NavLink to="/">
        {" "}
        <img src={logoImg} alt="D-Dil-Dtore Logo" className="logo" />
      </NavLink>

      <div className="search">
        <input type="text" />
      </div>
      <div>
        <div>
          {isAuthenticated ? (
            <p style={{ color: "white", fontSize: "14px" }}>
              Welcome, {user.name}!
            </p>
          ) : (
            <p style={{ color: "white", fontSize: "14px" }}>
              You are logged out. Please log in.
            </p>
          )}
        </div>

        <div className="nav">
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
            {isAuthenticated ? (
              <NavLink to="cart">
                <i class="fa-solid fa-cart-shopping cartIcon"></i>
                <span className="cartBadge">
                  {cartItems.length > 0 && cartItems.length}
                </span>
              </NavLink>
            ) : (
              <NavLink to="">
                <button
                  onClick={() => loginWithRedirect()}
                  className="auth--btn"
                >
                  <i class="fa-solid fa-cart-shopping cartIcon"></i>
                </button>
              </NavLink>
            )}

            {isAuthenticated ? (
              <NavLink to="">
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                  className="auth--btn"
                >
                  <i class="fa-solid fa-user"></i>
                </button>
              </NavLink>
            ) : (
              <NavLink to="">
                <button
                  onClick={() => loginWithRedirect()}
                  className="auth--btn"
                >
                  <i class="fa-solid fa-user"></i>
                </button>
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
