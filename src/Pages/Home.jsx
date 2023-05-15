import { useContext, useState } from "react";

import ProductCard from "../Components/ProductCard";
import { Context } from "..";
const Home = () => {
  const { data } = useContext(Context);
  const [isPopUp, setIsPopUp] = useState(false);

  const handlePopupClick = () => {
    setIsPopUp((prevState) => !prevState);
  };
  return (
    <div className="home-body">
      <button onClick={() => handlePopupClick()} className="filter--btn">
        Filter
      </button>
      {isPopUp && (
        <div className="filter--component">
          <div>
            <h3>PRICE</h3>
            <div className="inputs">
              <label>
                High to Low
                <input type="radio" />
              </label>
              <label>
                Low to High
                <input type="radio" />
              </label>
            </div>
          </div>
          <div>
            <h3>PRICE RANGE</h3>
            <div className="inputs">
              <input type="range" />
            </div>
          </div>
        </div>
      )}
      <div className="all--products">
        {data.map((product) => (
          <>
            <ProductCard
              id={product.id}
              title={product.title}
              img={product.thumbnail}
              rating={product.rating}
              price={product.price}
              key={product.id}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
