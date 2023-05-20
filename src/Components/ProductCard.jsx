import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { Context } from "..";

const ProductCard = ({ img, id, title, rating, price, discountPercentage }) => {
  const {
    cartItems,
    wishlistItems,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    handleAddToCart,
    handleRemoveFromCart,
  } = useContext(Context);

  const heartIcon = () => {
    if (wishlistItems.map((product) => product.id === id).includes(true)) {
      return (
        <i
          class="fa-solid fa-heart"
          onClick={() => handleRemoveFromWishlist(id)}
        ></i>
      );
    } else {
      return (
        <i
          class="fa-regular fa-heart"
          onClick={() => handleAddToWishlist(id)}
        ></i>
      );
    }
  };

  const cartIcon = () => {
    if (cartItems.map((product) => product.id === id).includes(true)) {
      return (
        <i
          class="fa-solid fa-cart-shopping"
          onClick={() => handleRemoveFromCart(id)}
        ></i>
      );
    } else {
      return (
        <i
          class="fa-solid fa-cart-plus"
          onClick={() => handleAddToCart(id)}
        ></i>
      );
    }
  };

  let location = useLocation();

  return (
    <div className="product--card">
      <div className="product--icons">
        <p>{heartIcon()}</p>
        <p> {cartIcon()}</p>
      </div>
      <img src={img} alt={title} />
      <h5 className="title">{title}</h5>
      <hr className="break--line" />
      <div className="price--details">
        <h5>
          ₹ {Math.round(price * 70 - (price * 70 * discountPercentage) / 100)}
        </h5>
        <h5 style={{ textDecoration: "line-through", color: "gray" }}>
          ₹ {price * 70}
        </h5>
        <h5 style={{ color: "green" }}>{discountPercentage}% off!</h5>
      </div>
      <p className="rating">
        <i
          class="fa-solid fa-star"
          style={{ color: "gray", fontSize: "14px" }}
        ></i>{" "}
        {""}
        {rating} (5)
      </p>
      <Link
        to={`/products/${id}`}
        state={{ from: location }}
        className="viewDetails--btn"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
