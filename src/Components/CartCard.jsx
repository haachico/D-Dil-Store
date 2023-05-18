import { useContext, useState } from "react";

import { Context } from "..";

const CartCard = ({ img, id, title, rating, price, discountPercentage }) => {
  const {
    cartItems,
    wishlistItems,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    handleAddToCart,
    handleRemoveFromCart,
    quantity,
    setQuantity,
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

  const decreaseQty = () => {
    setQuantity((prevState) => prevState - 1);
  };

  const increaseQty = () => {
    setQuantity((prevState) => prevState + 1);
  };

  return (
    <div className="product--card">
      <div className="product--icons">
        <p>{heartIcon()}</p>
        <p>{cartIcon()}</p>
      </div>
      <img src={img} alt={title} />
      <h4>{title}</h4>
      <hr className="break--line" />
      <div className="price--details">
        <h4>
          ₹ {Math.round(price * 70 - (price * 70 * discountPercentage) / 100)}
        </h4>
        <h4 style={{ textDecoration: "line-through", color: "gray" }}>
          ₹ {price * 70}
        </h4>
        <h4 style={{ color: "green" }}>{discountPercentage}% off!</h4>
      </div>
      <p className="rating">
        <i
          class="fa-solid fa-star"
          style={{ color: "gray", fontSize: "14px" }}
        ></i>{" "}
        {""}
        {rating} (5)
      </p>
      <div className="setQuantity">
        <p>
          Quantity :{" "}
          <span>
            <button
              onClick={decreaseQty}
              style={{ margin: "10px", cursor: "pointer" }}
            >
              -
            </button>
          </span>
          <span
            style={{
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              padding: "0px 5px",
            }}
          >
            {quantity > 0 ? quantity : 0}{" "}
          </span>{" "}
          <span>
            <button
              onClick={increaseQty}
              style={{ margin: "10px", cursor: "pointer" }}
            >
              +
            </button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartCard;
