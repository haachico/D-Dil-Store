import { useContext } from "react";

import { Context } from "..";
import ProductCard from "../Components/ProductCard";

const Wishlist = () => {
  const { wishlistItems } = useContext(Context);
  return wishlistItems.length === 0 ? (
    <h2>No items in wishlist.</h2>
  ) : (
    <div className="wishlist--items">
      <h3>My Wishlist : {wishlistItems.length}</h3>
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
  );
};

export default Wishlist;
