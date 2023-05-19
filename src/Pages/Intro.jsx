import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";

import Electronics from "../electronics.jpg";
import Cosmetics from "../Skin care.jpg";
import Groceries from "../Groceries.jpg";
import HomeDecor from "../home-decor.jpg";
import introCoverImg from "../intro-cover.jpg";

const Intro = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "",
        width: "100%",
        height: "100vh",
      }}
    >
      {isLoading ? (
        <FadeLoader
          color={"#FF0000"}
          loading={isLoading}
          size={300}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <div className="intro--cover">
            <img src={introCoverImg} className="intro--coverImg" />
            <Link to="home">Visit here.</Link>
          </div>
          <h1 style={{ marginTop: "3rem" }}>SHOP BY CATEGORY</h1>
          <div className="categories--img">
            <div className="category">
              <Link to="electronics">
                <img src={Electronics} alt="ELectronics category" />
                <h3>ELECTRONICS</h3>
              </Link>
            </div>
            <div className="category">
              <Link to="cosmetics">
                <img src={Cosmetics} alt="Cosmetic category" />
                <h3>COSMETICS</h3>
              </Link>
            </div>
            <div className="category">
              <Link to="groceries">
                <img src={Groceries} alt="Grocery category" />
                <h3>GROCERIES</h3>
              </Link>
            </div>
            <div className="category">
              <Link to="homedecor">
                <img src={HomeDecor} alt="Home Decor category" />
                <h3>HOME DECOR</h3>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Intro;
