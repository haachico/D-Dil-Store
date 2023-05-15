import { Link } from "react-router-dom";

import Electronics from "../electronics.jpg";
import Cosmetics from "../Skin care.jpg";
import Groceries from "../Groceries.jpg";
import HomeDecor from "../home-decor.jpg";
import introCoverImg from "../intro-cover.jpg";

import Home from "./Home";
const Intro = () => {
  return (
    <div>
      <div className="intro--cover">
        <img src={introCoverImg} className="intro--coverImg" />
        <Link to="/Home">Visit here.</Link>
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
    </div>
  );
};

export default Intro;
