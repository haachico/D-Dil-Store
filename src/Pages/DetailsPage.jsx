import { useContext } from "react";
import { useParams } from "react-router-dom";

import { Context } from "..";

const DetailsPage = () => {
  const { data } = useContext(Context);

  const { productId } = useParams();

  const product = data.find((product) => product.id == productId);

  console.log(product, "product");

  console.log(productId);
  return (
    <div className="details--page">
      <div>
        <img src={product?.thumbnail} />
      </div>
      <div className="product--details">
        <h1>Title : {product?.title}</h1>
        <h2 style={{ marginBottom: "1rem" }}>Brand: {product?.brand}</h2>
        <hr />
        <div style={{ display: "flex", gap: "1rem", margin: "0px" }}>
          <h2>
            Price : ₹{" "}
            {Math.round(
              product?.price * 70 -
                (product?.price * 70 * product?.discountPercentage) / 100
            )}
          </h2>
          <h2 style={{ textDecoration: "line-through", color: "gray" }}>
            ₹ {product?.price * 70}
          </h2>
          <h2 style={{ color: "green" }}>
            {product?.discountPercentage}% off!
          </h2>
        </div>

        <p className="description">
          <strong>Description</strong> : {product?.description}
        </p>
        <h5 className="stock">
          <strong>In stock</strong> : {product?.stock}
        </h5>
        <div className="details--btn">
          <button>Add to cart</button>
          <button>Add to wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
