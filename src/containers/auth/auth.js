import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Input from "components/UI/input/input";
import Button from "components/UI/button/button";
import Spinner from "components/UI/spinner/spinner";
import classes from "./auth.css";
import * as actions from "store/actions";
import { connect } from "react-redux";
import { updateObject, checkValidity } from "shared/utility";

const Auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;
    console.log(buildingBurger);
    console.log(authRedirectPath);
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  });

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: {
        ...authForm[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true
      }
    });
    setAuthForm(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    const { onAuth } = props;
    const { email, password } = authForm;
    onAuth(email.value, password.value, isSignUp);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  console.log(props);
  const formElementsArray = [];
  const { isAuthenticated, error, authRedirectPath } = props;
  const { loading } = props;
  for (let key in authForm) {
    formElementsArray.push({ id: key, config: authForm[key] });
  }
  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (loading) {
    form = <Spinner />;
  }
  let errorMessage = null;
  if (error) {
    const { message } = props.error;
    errorMessage = <p>{message}</p>;
  }
  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath} />;
  }
  return (
    <div className={classes.Auth}>
      {errorMessage}
      {authRedirect}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">Submit</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        Switch to {isSignUp ? "sign in" : "sign up"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapsDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};
export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(Auth);
