import { NavLink, Outlet } from "react-router-dom";

const HostLayout = () => {
  return (
    <div className="nested-routes">
      <NavLink to="/host" className="review">
        Reviews
      </NavLink>
      <NavLink to="about" className="about">
        About us
      </NavLink>
      <Outlet />
    </div>
  );
};

export default HostLayout;
