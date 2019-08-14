import React, { useEffect } from "react";
import Order from "components/order/order";
import axios from "../../axios-orders";
import withErrorHandler from "hoc/withErrorHandler/withErrorHandler";
import * as actions from "store/actions";
import { connect } from "react-redux";
import Spinner from "components/UI/spinner/spinner";

const Orders = ({ token, onFetchOrders, orders, loading }) => {
  useEffect(() => {
    onFetchOrders(token);
  }, [onFetchOrders, token]);

  console.log(loading);
  console.log(orders);
  return loading ? (
    <Spinner />
  ) : (
    <div>
      {orders &&
        orders.map(order => (
          <Order
            key={order.id}
            price={order.price}
            ingredients={order.ingredients}
          />
        ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: token => dispatch(actions.fetchOrders(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
