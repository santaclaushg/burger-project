import React from "react";
import CheckoutSummary from "components/order/checkoutSummary/checkoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "containers/checkout/contactData/contactData";
import { connect } from "react-redux";
import * as actions from "store/actions";

const Checkout = ({ onInitPurchase, history, ings, purchased, match }) => {
  onInitPurchase();
  const checkoutCancelHandler = () => {
    history.goBack();
  };
  const checkoutContinueHandler = () => {
    history.replace("/checkout/contact-data");
  };
  let summary = <Redirect to="/" />;
  if (ings) {
    const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
    console.log(purchasedRedirect);
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ings}
          checkoutCancelled={checkoutCancelHandler}
          checkoutContinued={checkoutContinueHandler}
        />
        <Route path={`${match.url}/contact-data`} component={ContactData} />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

const mapDisptachToProps = dispatch => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(Checkout);
