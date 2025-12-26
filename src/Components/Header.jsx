import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Context } from "..";
import logoImg from "./logo.png";

const Header = () => {
  const { wishlistItems, cartItems, searchText, setSearchText } =
    useContext(Context);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="header">
      <NavLink to="/">
        {" "}
        <img src={logoImg} alt="D-Dil-Dtore Logo" className="logo" />
      </NavLink>

      {console.log(searchText)}
      <div>
        <div>
          {isAuthenticated && user ? (
            <p className="auth--text">Welcome, {user.firstName} {user.lastName}!</p>
          ) : (
            <p className="auth--text"> You are not logged in.</p>
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
              <button onClick={handleLoginClick} className="auth--btn">
                <i class="fa-solid fa-cart-shopping cartIcon"></i>
              </button>
            )}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="auth--btn"
              >
                <i class="fa-solid fa-right-from-bracket"></i>
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="auth--btn"
              >
                <i class="fa-solid fa-right-from-bracket"></i>
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
