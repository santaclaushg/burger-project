import React, { useState } from "react";
import Aux from "hoc/auxiliary";
import classes from "hoc/layout/layout.css";
import Toolbar from "components/navigation/toolbar/toolbar";
import SideDrawer from "components/navigation/sideDrawer/sideDrawer";
import { connect } from "react-redux";

const Layout = ({ children, isAuthenticated }) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={isAuthenticated}
        onToggleClick={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.content}>{children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
