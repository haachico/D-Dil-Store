import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Context } from "..";

const CartCard = ({ img, id, title, rating, price, discountPercentage }) => {
  const {
    cartItems,
    wishlistItems,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    handleAddToCart,
    handleRemoveFromCart,
    // quantity,
    // setQuantity,
  } = useContext(Context);

  const user = JSON.parse(localStorage.getItem("userData"));

  const [quantity, setQuantity] = useState(1);

  const heartIcon = () => {
    const isInWishlist = wishlistItems.some((product) => product.id === Number(id));
    if (isInWishlist) {
      return (
        <i
          class="fa-solid fa-heart"
          onClick={() => handleRemoveFromWishlist(user.id, id)}
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
    const isInCart = cartItems.some((product) => product.id === Number(id));
    if (isInCart) {
      return (
        <i
          class="fa-solid fa-cart-shopping"
          onClick={() => handleRemoveFromCart(user.id, id)}
        ></i>
      );
    } else {
      return (
        <i
          class="fa-solid fa-cart-plus"
          onClick={() => handleAddToCart(user.id, id)}
        ></i>
      );
    }
  };

  const decreaseQty = async () => {

    try {

        let newQty = quantity - 1;
        setQuantity(newQty >= 0 ? newQty : 0);

        const response = await fetch("http://localhost:8080/d-dil-store-backend/config/api/Products/updateCartItemQuantity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({ userId: user.id, productId: id, quantity: newQty >= 0 ? newQty : 0 }),
        }); 

      const data =  await response.json();
      console.log(data, "UPDATE QTY RESPONSE");
    }
    catch(error) {
      console.error("Error decreasing quantity:", error);
    }

  
  };

  const increaseQty = async () => {
    try {
      let newQty = quantity + 1;
      setQuantity(newQty);

      const response = await fetch("http://localhost:8080/d-dil-store-backend/config/api/Products/updateCartItemQuantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ userId: user.id, productId: id, quantity: newQty }),
      });

    const data =  await response.json();
    console.log(data, "UPDATE QTY RESPONSE");
    }
    catch (error) {
      console.error("Error increasing quantity:", error);
    }
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
