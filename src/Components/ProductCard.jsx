import { useState, useContext } from "react";

import { Context } from "..";

const ProductCard = ({ img, id, title, rating, price }) => {
  const {
    isHearted,
    isAddedToCCart,
    handleHeartIconClick,
    handleHeartedIconClick,
    handleAddToCartIconClick,
    handleAddedToCartIconClick,
  } = useContext(Context);

  const heartReact = (
    <i class="fa-regular fa-heart" onClick={handleHeartIconClick}></i>
  );
  const reactedHeart = (
    <i class="fa-solid fa-heart" onClick={handleHeartedIconClick}></i>
  );

  const addToCart = (
    <i class="fa-solid fa-cart-plus" onClick={handleAddToCartIconClick}></i>
  );

  const addedToCart = (
    <i
      class="fa-solid fa-cart-shopping"
      onClick={handleAddedToCartIconClick}
    ></i>
  );

  return (
    <div className="product--card">
      <div className="product--icons">
        <p>{isHearted ? reactedHeart : heartReact}</p>
        <p>{isAddedToCCart ? addedToCart : addToCart}</p>
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
      <button className="addCart--btn">Add to cart</button>
    </div>
  );
};

export default ProductCard;
