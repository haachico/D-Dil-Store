import { Outlet } from "react-router-dom";
import Footer from "./Footer";

import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet className="outlet" />
      <Footer />
    </div>
  );
};

export default Layout;
