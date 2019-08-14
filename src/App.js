import React, { useEffect, lazy, Suspense } from "react";
import Layout from "hoc/layout/layout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import BurgerBuilder from "containers/burgerBuilder/burgerBuilder";
import Logout from "containers/auth/logout/logout";
import { connect } from "react-redux";
import * as actions from "store/actions";

const Auth = lazy(() => import("containers/auth/auth"));
const Orders = lazy(() => import("containers/orders/orders"));
const Checkout = lazy(() => import("containers/checkout/checkout"));

const App = ({ onTryAutoSignUp, isAuthenticated }) => {
  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
