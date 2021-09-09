import { useCallback, useState } from "react";
import { requestStatus, useAsync } from "./useAsync";
const apiURL = "https://ballchasing.com/api";

const customFetch = async (URL, init, setIsSuccess) => {
  const authHeader = {
    Authorization: process.env.VITE_API_KEY,
  };
  const response = await fetch(`${apiURL}${URL}`, {
    ...init,
    headers: {
      ...init?.headers,
      ...authHeader,
    },
  });

  let json;

  try {
    json = await response.json();
  } catch {
    json = null;
  }

  if (response.ok) {
    setIsSuccess(true);
    return { inError: false, data: json, httpCode: response.status };
  } else {
    setIsSuccess(false);
    return { inError: true, error: json, httpCode: response.status };
  }
};

const useFetch = () => {
  const [isSuccess, setIsSuccess] = useState();
  const { run, data, status, httpCode, resetFetchState } = useAsync();

  const get = useCallback(
    (URL, init) =>
      run(
        customFetch(`${URL}`, {
          method: "GET",
          ...init,
        }, setIsSuccess)
      ),
    [run]
  );

  const isResolved = status === requestStatus.resolved;
  const hasError = status === requestStatus.error;
  const isLoading = status === requestStatus.pending;
  const isIdle = status === requestStatus.idle;

  return {
    get,
    data,
    isResolved,
    isSuccess,
    hasError,
    httpCode,
    isLoading,
    isIdle,
    resetFetchState,
  };
};

export { useFetch };
