import { useContext } from "react";

import { Context } from "..";
import ProductCard from "../Components/ProductCard";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems } = useContext(Context);
  return (
    <div style={{ marginTop: "100px" }}>
      {wishlistItems.length === 0 ? (
        <div>
          <h4>No items in wishlist.</h4>
          <Link to="/home" style={{ color: "red", fontWeight: "600" }}>
            Shop now.
          </Link>
        </div>
      ) : (
        <>
          <h3>My Wishlist : {wishlistItems.length}</h3>
          <div className="wishlist--items">
            {wishlistItems.map((product) => (
              <ProductCard
                img={product.thumbnail}
                id={product.id}
                title={product.title}
                rating={product.rating}
                price={product.price}
                discountPercentage={product.discountPercentage}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
