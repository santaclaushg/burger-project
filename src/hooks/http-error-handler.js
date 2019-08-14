import { useState, useEffect, useRef } from "react";

export default httpClient => {
  const latestProp = useRef(httpClient);

  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    res => res,
    error => {
      setError(error);
    }
  );

  useEffect(() => {
    latestProp.current = httpClient;
  });

  useEffect(() => {
    return () => {
      latestProp.current.interceptors.request.eject(reqInterceptor);
      latestProp.current.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmHandler = () => {
    setError(null);
  };

  return [error, errorConfirmHandler];
};
