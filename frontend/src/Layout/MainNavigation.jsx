import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
const MainNavigation = () => {
  return (
    <ul className={classes['nav-links-list']}>
      <li className={classes['nav-link-item']}>
        <NavLink
          to="/"
          className={({isActive}) => (isActive ? classes['active-route'] : undefined)}
          end
        >
          Home
        </NavLink>
      </li>
      <li className={classes['nav-link-item']}>
        <NavLink
          to="/events"
          className={({isActive}) => (isActive ? classes['active-route'] : undefined)}
        >
          Events
        </NavLink>
      </li>
    </ul>
  );
};
export default MainNavigation;
