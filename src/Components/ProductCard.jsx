import { useState, useContext } from "react";

import { Context } from "..";

const ProductCard = ({ img, id, title, rating, price }) => {
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

  return (
    <div className="product--card">
      <div className="product--icons">
        {heartIcon()}
        {cartIcon()}
      </div>
      <img src={img} alt={title} />
      <h4>{title}</h4>
      <hr className="break--line" />
      <p className="price"> ₹ {price * 70}</p>
      <p className="rating">
        <i
          class="fa-solid fa-star"
          style={{ color: "gray", fontSize: "14px" }}
        ></i>{" "}
        {""}
        {rating} (5)
      </p>
      {/* <button className="addCart--btn">Add to cart</button> */}
    </div>
  );
};

export default ProductCard;
