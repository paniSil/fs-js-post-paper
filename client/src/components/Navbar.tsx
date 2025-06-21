import { NavLink } from "react-router";
import { routes } from "../routes/config";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="navbar__list">
          <div className="navbar__menu">
            {routes
              .filter((route) => route.showInNav)
              .map((route) => (
                <li className="navbar__item">
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className="navbar__link"
                  >
                    {route.label}
                  </NavLink>
                </li>
              ))}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
