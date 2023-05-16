import { useContext, useState } from "react";

import ProductCard from "../Components/ProductCard";
import { Context } from "..";
const Home = () => {
  const { data } = useContext(Context);
  const [isPopUp, setIsPopUp] = useState(false);
  const [selectedSort, setSelectedSort] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedRating, setSelectedRating] = useState("5 STARS AND BELOW");
  const [isELectronicsSelected, setIsELectronicsSelected] = useState(false);
  const [isCosmeticsSelected, setIsCosmeticsSelected] = useState(false);
  const [isGroceriesSelected, setIsGroceriesSelected] = useState(false);
  const [isHomeDecorSelected, setIsHomeDecorSelected] = useState(false);

  const handlePopupClick = () => {
    setIsPopUp((prevState) => !prevState);
  };

  const handleSortClick = (e) => {
    setSelectedSort(e.target.value);
  };

  const sortedProducts =
    selectedSort === "HIGH TO LOW"
      ? data.sort((a, b) => b.price - a.price)
      : selectedSort === "LOW TO HIGH"
      ? data.sort((a, b) => a.price - b.price)
      : data;

  const handleMinPriceChange = (event) => {
    setMaxPrice(Math.round(event.target.value));
  };

  const rangedPrice = sortedProducts.filter(
    (product) => product.price * 70 <= maxPrice
  );

  const handleSelectRating = (e) => {
    setSelectedRating(e.target.value);
  };

  console.log(rangedPrice, "RANGED PRICE");
  const sortedByRatings =
    selectedRating === "5 STARS AND BELOW"
      ? rangedPrice.filter((product) => product.rating <= 5)
      : selectedRating === "4 STARS AND BELOW"
      ? rangedPrice.filter((product) => product.rating <= 4)
      : selectedRating === "3 STARS AND BELOW"
      ? rangedPrice.filter((product) => product.rating <= 3)
      : rangedPrice.filter((product) => product.rating < 3);

  const handleELectronicsCheckBox = (e) => {
    const isChecked = e.target.checked;
    setIsELectronicsSelected(isChecked);
  };

  const handleCosmeticsCheckBox = (e) => {
    const isChecked = e.target.checked;
    setIsCosmeticsSelected(isChecked);
  };

  const handleGroceriesCheckBox = (e) => {
    const isChecked = e.target.checked;
    setIsGroceriesSelected(isChecked);
  };

  const handleHomeDecorCheckBox = (e) => {
    const isChecked = e.target.checked;
    setIsHomeDecorSelected(isChecked);
  };

  // let displayedProducts = isELectronicsSelected
  //   ? sortedByRatings.filter((product) =>
  //       ["smartphones", "laptops"].includes(product.category)
  //     )
  //   : isCosmeticsSelected
  //   ? sortedByRatings.filter((product) =>
  //       ["fragrances", "skincare"].includes(product.category)
  //     )
  //   : isGroceriesSelected
  //   ? sortedByRatings.filter((product) => product.category === "groceries")
  //   : isHomeDecorSelected
  //   ? sortedByRatings.filter(
  //       (product) => product.category === "home-decoration"
  //     )
  //   : sortedByRatings;

  

  let displayedCategories = [];

  displayedCategories = isELectronicsSelected
    ? displayedCategories.concat(["smartphones", "laptops"])
    : displayedCategories;

  displayedCategories = isCosmeticsSelected
    ? displayedCategories.concat(["fragrances", "skincare"])
    : displayedCategories;

  displayedCategories = isGroceriesSelected
    ? displayedCategories.concat(["groceries"])
    : displayedCategories;

  displayedCategories = isHomeDecorSelected
    ? displayedCategories.concat(["home-decoration"])
    : displayedCategories;

  console.log(displayedCategories, "DISPLAYED CATEGORIES");

  let displayedProducts = sortedByRatings;

  displayedProducts =
    displayedCategories.length === 0
      ? displayedProducts
      : displayedProducts.filter((product) =>
          displayedCategories.includes(product.category)
        );

  console.log(
    isELectronicsSelected,
    isCosmeticsSelected,
    isGroceriesSelected,
    isHomeDecorSelected
  );

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
                <input
                  type="radio"
                  name="HIGH TO LOW"
                  value="HIGH TO LOW"
                  checked={selectedSort === "HIGH TO LOW"}
                  onChange={(event) => handleSortClick(event)}
                />
              </label>
              <label>
                Low to High
                <input
                  type="radio"
                  name="LOW TO HIGH"
                  value="LOW TO HIGH"
                  checked={selectedSort === "LOW TO HIGH"}
                  onChange={(event) => handleSortClick(event)}
                />
              </label>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: "10px" }}>PRICE RANGE</h3>
            <input
              type="range"
              min="10000"
              max="100000"
              step="10000"
              value={maxPrice}
              onChange={handleMinPriceChange}
              style={{ width: "100%" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0px",
              }}
            >
              <p>10000</p>

              <p>
                <strong>{maxPrice}</strong>
              </p>
            </div>
          </div>
          <div>
            <h3>FILTER BY RATINGS</h3>
            <div className="inputs">
              <label>
                <input
                  type="radio"
                  name="5 STARS AND BELOW"
                  value="5 STARS AND BELOW"
                  checked={selectedRating === "5 STARS AND BELOW"}
                  onChange={(event) => handleSelectRating(event)}
                />
                5 stars and below
              </label>
              <label>
                <input
                  type="radio"
                  name="4 STARS AND BELOW"
                  value="4 STARS AND BELOW"
                  checked={selectedRating === "4 STARS AND BELOW"}
                  onChange={(event) => handleSelectRating(event)}
                />
                4 stars and below
              </label>
              <label>
                <input
                  type="radio"
                  name="3 STARS AND BELOW"
                  value="3 STARS AND BELOW"
                  checked={selectedRating === "3 STARS AND BELOW"}
                  onChange={(event) => handleSelectRating(event)}
                />
                3 stars and below
              </label>
              <label>
                <input
                  type="radio"
                  name="BELOW 3 STARS"
                  value="BELOW 3 STARS"
                  checked={selectedRating === "BELOW 3 STARS"}
                  onChange={(event) => handleSelectRating(event)}
                />
                Below 3 stars
              </label>
            </div>
          </div>
          <div>
            <h3>CATEGORIES</h3>
            <div className="inputs">
              <label>
                <input
                  type="checkbox"
                  name="Electronics"
                  value={isELectronicsSelected}
                  onChange={(event) => handleELectronicsCheckBox(event)}
                />
                Electronics
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Cosmetics"
                  value={isCosmeticsSelected}
                  onChange={(event) => handleCosmeticsCheckBox(event)}
                />
                Cosmetics
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Groceries"
                  value={isGroceriesSelected}
                  onChange={(event) => handleGroceriesCheckBox(event)}
                />
                Groceries
              </label>
              <label>
                <input
                  type="checkbox"
                  name="HOME DECOR"
                  value={isHomeDecorSelected}
                  onChange={(event) => handleHomeDecorCheckBox(event)}
                />
                HOME DECOR
              </label>
            </div>
          </div>
        </div>
      )}
      {console.log(sortedByRatings, "SORTED BY RATINGS")}
      <div className="all--products">
        {displayedProducts.map((product) => (
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
