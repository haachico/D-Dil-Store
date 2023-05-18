import { useContext } from "react";

import { Context } from "..";
import CartCard from "../Components/CartCard";

const Cart = () => {
  const { cartItems } = useContext(Context);

  console.log(cartItems, "CART ITEMS");

  const cartTotal = cartItems.reduce((acc, curr) => acc + curr.price * 70, 0);

  const totalDiscount = cartItems.reduce(
    (acc, curr) => acc + (curr.discountPercentage / 100) * curr.price * 70,
    0
  );

  console.log(cartTotal, "CART TOTAL");
  console.log(totalDiscount, "TOTAL DISCOUNT");
  return (
    <div className="cart--page">
      {cartItems.length === 0 ? (
        <h2>No items in cart.</h2>
      ) : (
        <div className="cart--items">
          {cartItems.map((product) => (
            <CartCard
              id={product.id}
              title={product.title}
              img={product.thumbnail}
              rating={product.rating}
              price={product.price}
              key={product.id}
              discountPercentage={product.discountPercentage}
            />
          ))}
        </div>
      )}
      <div className="bill">
        <h1>Billing Details</h1>
        <div>
          <div className="billing--details">
            <div>
              <p>Cart total : </p>
              <p>Discount : </p>
              <h3>Total Amount : </h3>
            </div>
            <div style={{ textAlign: "right" }}>
              <p> ₹ {cartTotal}</p>
              <p> ₹ {Math.round(totalDiscount)}</p>
              <h3> ₹ {cartTotal - Math.round(totalDiscount)}</h3>
            </div>
          </div>
          <button className="checkout--btn">Check out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
