import { NavLink, Outlet } from "react-router-dom";

const HostLayout = () => {
  return (
    <div>
      <NavLink to="/host">Reviews</NavLink> || {""}
      <NavLink to="about">About</NavLink>
      <Outlet />
    </div>
  );
};

export default HostLayout;
