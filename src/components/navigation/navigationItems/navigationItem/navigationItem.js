import React from "react";
import classes from "./navigationItem.css";
import { NavLink } from "react-router-dom";

const NavigationItem = ({ children, link, active }) => {
  // console.log(children, active);
  // console.log(classes.active);
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={link} exact activeClassName={classes.active}>
        {children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
