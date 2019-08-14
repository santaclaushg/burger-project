import React from "react";
import Burger from "components/burger/burger";
import Button from "components/UI/button/button";
import classes from "./checkoutSummary.css";

const CheckoutSummary = ({
  checkoutCancelled,
  checkoutContinued,
  ingredients
}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", height: "300px", margin: "auto" }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="Danger" clicked={checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};
export default CheckoutSummary;
