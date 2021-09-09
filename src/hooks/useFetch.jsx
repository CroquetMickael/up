import { useCallback, useState } from "react";
import { useUser } from "../context/UserContext";
import { requestStatus, useAsync } from "./useAsync";

export const apiURL = "https://ballchasing.com/api";

const customFetch = async (URL, init, setIsSuccess, apiKey) => {
  const authHeader = {
    Authorization: apiKey,
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
  const { user } = useUser();

  const get = useCallback(
    (URL, init) =>
      run(
        customFetch(
          `${URL}`,
          {
            method: "GET",
            ...init,
          },
          setIsSuccess,
          user?.apiKey
        )
      ),
    [run, user?.apiKey]
  );

  const post = useCallback(
    (URL, init) =>
      run(
        customFetch(
          `${URL}`,
          {
            method: "POST",
            ...init,
          },
          setIsSuccess,
          user?.apiKey
        )
      ),
    [run, user?.apiKey]
  );

  const isResolved = status === requestStatus.resolved;
  const hasError = status === requestStatus.error;
  const isLoading = status === requestStatus.pending;
  const isIdle = status === requestStatus.idle;

  return {
    post,
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
