import React, { useState, useEffect, useRef } from "react";
import Aux from "hoc/auxiliary";
import Burger from "components/burger/burger";
import BuildControls from "components/burger/buildControls/buildControls";
import Modal from "components/UI/modal/modal";
import OrderSumary from "../../components/burger/orderSumary/orderSumary";
import axios from "../../axios-orders";
import Spinner from "components/UI/spinner/spinner";
import withErrorHandler from "hoc/withErrorHandler/withErrorHandler";
import * as actions from "store/actions";
import { connect } from "react-redux";

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const latestProp = useRef(props);

  useEffect(() => {
    latestProp.current = props;
  });

  useEffect(() => {
    console.log("burger", latestProp);
    const { onInitIngredient } = latestProp.current;
    onInitIngredient();
    // axios
    //   .get(`https://react-my-burger-f969b.firebaseio.com/ingredients.json`)
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(() => this.setState({ error: true }));
  }, []);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((currentSum, el) => {
        return currentSum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    const { isAuthenticated, history } = props;
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      console.log("save checkout and goes to auth");
      const { onSetAuthRedirectPath } = props;
      onSetAuthRedirectPath("/checkout");
      history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    // const queryParams = [];
    // const { totalPrice, history } = this.props;
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     `${encodeURIComponent(i)}=${encodeURIComponent(
    //       this.state.ingredients[i]
    //     )}`
    //   );
    // }
    // queryParams.push(`price=${totalPrice}`);
    // const queryString = queryParams.join("&");
    // history.push({
    //   pathname: "/checkout",
    //   search: `?${queryString}`
    // });
    const { onInitPurchase } = props;
    onInitPurchase();
    props.history.push("/checkout");
  };

  const {
    ings,
    totalPrice,
    onIngredientAdded,
    onIngredientRemove,
    error,
    isAuthenticated,
    loading
  } = props;
  const disabledInfo = {
    ...ings
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSumary = null;
  if (loading) {
    orderSumary = <Spinner />;
  }
  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
  if (ings) {
    burger = (
      <Aux>
        <Burger show={purchasing} ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemove}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </Aux>
    );
    orderSumary = (
      <OrderSumary
        ingredients={ings}
        purchaseCancel={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
        price={totalPrice}
      />
    );
  }
  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSumary}
      </Modal>
      {burger}
    </Aux>
  );
};
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    loading: state.order.loading,
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemove: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredient()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
