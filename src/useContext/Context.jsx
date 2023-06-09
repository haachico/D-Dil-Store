import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { allData } from "../allData";
export const Context = createContext();

export const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabetView] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust the breakpoint as needed
      setIsTabetView(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const getData = () => {
    try {
      const response = allData;

      setData(response.products);
    } catch (err) {
      setIsError(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddToWishlist = (id) => {
    setWishlistItems([
      ...wishlistItems,
      ...data.filter((product) => product.id === id),
    ]);
    toast.success("Item added to wishlist!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((product) => product.id !== id));
    toast.success("Item removed from wishlist!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleAddToCart = (id) => {
    setCartItems([
      ...cartItems,
      ...data.filter((product) => product.id === id),
    ]);
    toast.success("Item added to cart!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter((product) => product.id !== id));
    toast.success("Item removed from cart!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  console.log(data, "DATA");
  console.log(wishlistItems, "WISHLIST ITEMS");
  console.log(cartItems, "CART ITEMS");
  return (
    <div>
      <Context.Provider
        value={{
          data,
          cartItems,
          setCartItems,
          wishlistItems,
          handleAddToWishlist,
          handleRemoveFromWishlist,
          handleAddToCart,
          handleRemoveFromCart,
          isMobileView,
          isTabletView,
          toggleFilter,
          isFilterOpen,
          quantity,
          setQuantity,
          searchText,
          setSearchText,
          isError,
        }}
      >
        {children}
      </Context.Provider>
    </div>
  );
};
