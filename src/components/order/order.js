import React from "react";
import classes from "./order.css";

export default function order({ ingredients, price }) {
  const ingredientArr = [];
  console.log(ingredients);
  for (let ingredientName in ingredients) {
    ingredientArr.push({
      name: ingredientName,
      amount: ingredients[ingredientName]
    });
  }
  // console.log(ingredients);
  // console.log(ingredientArr);
  const ingredientOutput =  ingredientArr.map(ig => {
    return (
      <span 
        key={ig.name} 
        style={
          { textTransform: "capitalize", 
          display: 'inline-block', 
          margin: '0 8px', border: '1px solid #ccc', padding: '5px' }}>
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: Salad <strong>USD {Number.parseFloat(price).toFixed(2)}</strong>
      </p>
    </div>
  );
}
