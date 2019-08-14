import React from "react";
import classes from "./button.css";

const Button = ({ children, clicked, btnType, disabled }) => {
  return (
    <button
      className={[classes.Button, classes[btnType]].join(" ")}
      onClick={clicked}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
