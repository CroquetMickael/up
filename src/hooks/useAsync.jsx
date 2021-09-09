import { useCallback, useLayoutEffect, useReducer, useRef } from "react";

export const requestStatus = {
  error: "ERROR",
  resolved: "RESOLVED",
  idle: "IDLE",
  pending: "PENDING",
};

const fetchStateReducer = (state, { promiseState, ...action }) => ({
  ...state,
  ...action,
  status: promiseState,
});

function useSafeDispatch(dispatch) {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);

  return useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}

const defaultReduceState = {
  error: undefined,
  data: undefined,
  httpCode: undefined,
};

function useAsync() {
  const [state, unsafeDispatch] = useReducer(fetchStateReducer, {
    status: "IDLE",
    ...defaultReduceState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status, httpCode } = state;

  const run = useCallback(
    (promise) => {
      dispatch({ type: "pending", ...defaultReduceState });
      promise.then(
        (result) => {
          const isError = result.inError;
          delete result.inError;
          dispatch({ ...result, promiseState: isError ? "ERROR" : "RESOLVED" });
        },
        (error) => {
          dispatch({
            promiseState: "ERROR",
            error,
            httpCode: error.status || -1,
          });
        }
      );
    },
    [dispatch]
  );

  const resetFetchState = () => {
    dispatch({ status: requestStatus.idle, ...defaultReduceState });
  };

  return {
    error,
    status,
    data,
    run,
    httpCode,
    resetFetchState,
  };
}

export { useAsync };
