import * as actionTypes from "store/actions/actionsTypes";
import initialState from "../initialState";
import { updateObject } from "shared/utility";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const addIngredients = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngedients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngedients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  const updatedState = {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building: false
  };
  return updateObject(state, updatedState);
};

const fetchIngredientsFailed = (state, action) => {
  const updatedState = {
    error: true
  };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS: {
      return addIngredients(state, action);
    }
    case actionTypes.REMOVE_INGREDIENTS: {
      return removeIngredients(state, action);
    }
    case actionTypes.SET_INGREDIENTS: {
      return setIngredients(state, action);
    }
    case actionTypes.FETCH_INGREDIENTS_FAILED: {
      return fetchIngredientsFailed(state, action);
    }
    default: {
      return state;
    }
  }
};
export default reducer;
