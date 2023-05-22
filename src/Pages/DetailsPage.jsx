import { useContext } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Context } from "..";

const DetailsPage = () => {
  const { data, handleAddToCart, cartItems } = useContext(Context);
  const { loginWithRedirect, loginWithPopup, logout, isAuthenticated, user } =
    useAuth0();

  const { productId } = useParams();

  const product = data.find((product) => product.id == productId);

  console.log(product, "product");

  console.log(productId);

  let location = useLocation();

  console.log(location);

  return (
    <div style={{ marginTop: "1rem" }}>
      <Link
        to={`${location?.state?.from?.pathname}`}
        relative="path"
        className="back--button"
      >
        &larr; <span>Back</span>
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="details--page">
          <div>
            <img src={product?.thumbnail} />
          </div>
          <div className="product--details">
            <h1>Title : {product?.title}</h1>
            <h2 style={{ marginBottom: "1rem" }}>Brand : {product?.brand}</h2>
            <hr />
            <div style={{ display: "flex", gap: "1rem", margin: "0px" }}>
              <h3>
                Price : ₹{" "}
                {Math.round(
                  product?.price * 70 -
                    (product?.price * 70 * product?.discountPercentage) / 100
                )}
              </h3>
              <h3 style={{ textDecoration: "line-through", color: "gray" }}>
                ₹ {product?.price * 70}
              </h3>
              <h3 style={{ color: "green" }}>
                {product?.discountPercentage}% off!
              </h3>
            </div>

            <p className="description">
              <strong>Description</strong> : {product?.description}
            </p>
            <h5 className="stock">
              <strong>In stock</strong> : {product?.stock}
            </h5>
            <div className="details--btn">
              {cartItems
                .map((product) => product.id == productId)
                .includes(true) ? (
                isAuthenticated ? (
                  <Link to="/cart" className="go--to--cart--link">
                    Go to cart
                  </Link>
                ) : (
                  <button
                    onClick={() => loginWithPopup()}
                    style={{
                      backgroundColor: "white",
                      color: "red",
                      border: "none",
                      fontWeight: "700",
                      boxShadow: "none",
                      fontSize: "1.2rem",
                      textDecoration: "underline",
                    }}
                  >
                    Go to cart
                  </button>
                )
              ) : (
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="add--to--cart--btn"
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
