import { useContext } from "react";

import { Context } from "..";
import WishlistCard from "../Components/WishlistCard";

const Wishlist = () => {
  const { wishlistItems } = useContext(Context);
  return (
    <div className="wishlist--items">
      {wishlistItems.map((product) => (
        <WishlistCard
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
