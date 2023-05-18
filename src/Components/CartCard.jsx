import { useContext } from "react";

import { Context } from "..";

const CartCard = ({ img, id, title, rating, price, discountPercentage }) => {
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
    </div>
  );
};

export default CartCard;
