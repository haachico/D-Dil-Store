import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../Components/ProductCard";
import { Context } from "..";
const HomeDecor = () => {
  const { data, isMobileView, isTabletView, toggleFilter, isFilterOpen } =
    useContext(Context);

  const [selectedSort, setSelectedSort] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedRating, setSelectedRating] = useState("5 STARS AND BELOW");
  const [isELectronicsSelected, setIsELectronicsSelected] = useState(false);
  const [isCosmeticsSelected, setIsCosmeticsSelected] = useState(false);
  const [isGroceriesSelected, setIsGroceriesSelected] = useState(false);
  const [isHomeDecorSelected, setIsHomeDecorSelected] = useState(false);

  // const handlePopupClick = () => {
  //   setIsPopUp((prevState) => !prevState);
  // };

  const handleClearFilter = () => {
    setSelectedSort("ALL");
    setMaxPrice(100000);
    setSelectedRating("5 STARS AND BELOW");
    setIsELectronicsSelected(false);
    setIsCosmeticsSelected(false);
    setIsGroceriesSelected(false);
    setIsHomeDecorSelected(false);
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

  //In Mail App or others apps in which we did/ used checkboxes before, more of than one info of the same product we were checking. For eg , in mail app, if we clicked on unread Msgs checkbox, all unread Msgs were getting displayed/fltered. And then if we clicked on Starred msg, starred property of the already filtered unreadMsgs was being checked. But here in this context below, if we try doing with with the previous logic, if we checkbox isElectronic, smartphones or laptops category products were getting filtered, and then we checkbox another categor like cosmetic at the same time, there won't be cosmetic category products in the already filtered Electronic products (becuase we ares setting new array with every filter as we have used Let and then reassigning). If we have to checkbox infos of more than one product, unlike before, we can do the below method. Bacsially below, we are using And logic. With every click on check, those properties that are checcked are getting added to the array and with every uncheck, those proerties are getting removied. And based on the array, we are displaying the data, and if array length is empty--that is when all are unchecked--all data is displayed.

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
    <div>
      {(isMobileView || isTabletView) && (
        <button onClick={toggleFilter} className="filter--btn">
          {" "}
          Filter <i class="fa-solid fa-filter"></i>
        </button>
      )}
      <div className="home-body">
        <div>
          {isMobileView || isTabletView ? (
            <>
              {isFilterOpen && (
                <div className="filter--component">
                  <div>
                    <div>
                      <button
                        className="clear--filters"
                        onClick={() => handleClearFilter()}
                      >
                        CLEAR
                      </button>
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
                        style={{
                          width: "100%",
                          marginBottom: "0px",
                          padding: "0px",
                        }}
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
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="filter--component">
              <div>
                <div>
                  <button
                    className="clear--filters"
                    onClick={() => handleClearFilter()}
                  >
                    CLEAR
                  </button>
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
                    style={{
                      width: "100%",
                      marginBottom: "0px",
                      padding: "0px",
                    }}
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
              </div>
            </div>
          )}
        </div>
        <div style={{ marginTop: "1rem" }}>
          <Link to="/" className="back--button">
            &larr; Back
          </Link>

          <div className="all--products">
            {displayedProducts
              .filter((product) =>
                ["home-decoration"].includes(product.category)
              )
              .map((product) => (
                <ProductCard
                  id={product.id}
                  title={product.title}
                  img={product.thumbnail}
                  rating={product.rating}
                  price={product.price}
                  key={product.id}
                  discountPercentage={product.discountPercentage}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDecor;
