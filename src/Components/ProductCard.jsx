const ProductCard = ({ img, id, title, rating, price }) => {
  return (
    <div className="product--card">
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
