import React from "react";

import Aux from "hoc/auxiliary";
import Button from "components/UI/button/button";

const OrderSumary = props => {
  const { ingredients, purchaseCancel, purchaseContinue, price } = props;
  const ingredientsSumary = Object.keys(ingredients).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: "capitalize" }}>{igKey}</span>:&nbsp;
      {ingredients[igKey]}
    </li>
  ));

  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicous burger with the following ingredients: </p>
      <ul>{ingredientsSumary}</ul>
      <p>
        <strong>Total price: {price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={purchaseCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={purchaseContinue}>
        CONTINUE
      </Button>
    </Aux>
  );
};
export default OrderSumary;
