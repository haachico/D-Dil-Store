import { createContext, useEffect, useState } from "react";

import { allData } from "../allData";
export const Context = createContext();

export const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isHearted, setIsHearted] = useState(false);
  const [isAddedToCCart, setIsAddedToCart] = useState(false);

  const handleHeartIconClick = () => {
    setIsHearted(true);
  };

  const handleHeartedIconClick = () => {
    setIsHearted(false);
  };

  const handleAddToCartIconClick = () => {
    setIsAddedToCart(true);
  };

  const handleAddedToCartIconClick = () => {
    setIsAddedToCart(false);
  };
  const getData = async () => {
    try {
      const response = await allData;

      setData(response.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Context.Provider
        value={{
          data,
          isHearted,
          isAddedToCCart,
          handleHeartIconClick,
          handleHeartedIconClick,
          handleAddToCartIconClick,
          handleAddedToCartIconClick,
        }}
      >
        {children}
      </Context.Provider>
    </div>
  );
};
