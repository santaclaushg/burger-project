import * as actionTypes from "./actionsTypes";
import axios from "axios-orders";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: name
  };
};
export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  };
};

export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredient = () => {
  return dispatch => {
    axios
      .get(`https://react-my-burger-f969b.firebaseio.com/ingredients.json`)
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => dispatch(fetchIngredientFailed()));
  };
};
