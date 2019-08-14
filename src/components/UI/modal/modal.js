import React, { memo } from "react";
import classes from "components/UI/modal/modal.css";
import Aux from "hoc/auxiliary";
import Backdrop from "components/UI/backdrop/backdrop";

const Modal = ({ children, show, modalClosed }) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.show !== this.props.show ||
  //     nextProps.children !== this.props.children
  //   );
  // }
  return (
    <Aux>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? `translateY(0px)` : `translateY(-100vh)`,
          opacity: show ? "1" : "0"
        }}
      >
        {children}
      </div>
    </Aux>
  );
};

const shouldUpdate = (prevProp, nextProps) =>
  nextProps.show === prevProp.show || nextProps.children === prevProp.children;

export default memo(Modal, shouldUpdate);
