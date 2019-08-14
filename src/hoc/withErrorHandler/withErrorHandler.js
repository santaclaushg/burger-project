import React from "react";
import Modal from "components/UI/modal/modal";
import Aux from "hoc/auxiliary";
import useHttpErrorHandler from "hooks/http-error-handler";

const WithErrorHandler = (WrappedComponent, axios) => {
  return function ParentComponent(props) {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default WithErrorHandler;
