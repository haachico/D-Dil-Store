import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="layout--div">
      <Header />
      <div className="outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
