import { useContext, useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Context } from "..";

const DetailsPage = () => {
  const { data, handleAddToCart, cartItems } = useContext(Context);

  const [product, setProduct] = useState(null);
  // const { loginWithRedirect, loginWithPopup, logout, isAuthenticated, user } =
  //   useAuth0();

  const navigate = useNavigate();
  const { productId } = useParams();

  // const product = data.find((product) => product.id == productId);

  // console.log(product, "product");

  // console.log(productId);

  // let location = useLocation();

  // console.log(location);


  const fetchProductDetails = async() => {
    try {

      const respones = await fetch(`http://localhost:8080/d-dil-store-backend/config/api/Products/getProductDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: productId }),
      });

      const productData = await respones.json();

      console.log(productData, "PRODUCT DETAILS");
      setProduct(productData.data);
    }
    catch (error) {
     console.error("Error fetching product details:", error); 
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, []);

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
          height: "100vh",
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
                .includes(true) ?
                  <button
                    onClick={() => {
                      navigate('/cart')
                    }}
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
                
              : (
                <button
                  onClick={() =>{
                     handleAddToCart(localStorage.getItem("userId"), product?.id, 1)

                    window.location.reload();
                  }}
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
