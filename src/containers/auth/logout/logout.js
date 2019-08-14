import React, { useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "store/actions";

const Logout = props => {
  const latestProp = useRef(props);
  useEffect(() => {
    latestProp.current = props;
  });

  useEffect(() => {
    const { onLogout } = latestProp.current;
    onLogout();
  }, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Logout);
