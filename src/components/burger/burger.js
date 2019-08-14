import React from "react";
import { withRouter } from "react-router-dom";
import classes from "components/burger/burger.css";
import BurgerIngredients from "components/burger/burgerIngredients/burgerIngredients";

const Burger = props => {
  const { ingredients } = props;
  let transformedIngredients;
  if (ingredients) {
    transformedIngredients = Object.keys(ingredients)
      .map(igKey => {
        return [...Array(ingredients[igKey])].map((_, index) => {
          return <BurgerIngredients key={igKey + index} type={igKey} />;
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
    if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients</p>;
    }
  }
  // useEffect(() => {
  //   console.log("transformedIngredients", transformedIngredients);
  // });
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);
