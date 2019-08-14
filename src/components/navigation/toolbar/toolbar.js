import React from "react";

import classes from "./toolbar.css";
import Logo from "components/logo/logo";
import NavigationItems from "components/navigation/navigationItems/navigationItems";
import DrawerToggle from "components/navigation/sideDrawer/drawerToggle/drawerToggle";

const Toolbar = ({ onToggleClick, isAuth }) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={onToggleClick} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={isAuth} />
      </nav>
    </header>
  );
};

export default Toolbar;
