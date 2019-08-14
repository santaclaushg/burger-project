import React from "react";
import Logo from "components/logo/logo";
import NavigationItems from "components/navigation/navigationItems/navigationItems";
import classes from "./sideDrawer.css";
import Backdrop from "components/UI/backdrop/backdrop";
import Aux from "hoc/auxiliary";

const SideDrawer = ({ closed, open, isAuth }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(" ")} onClick={closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
