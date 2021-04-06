import { useCallback } from "react";
import { requestStatus, useAsync } from "./useAsync";
const apiURL = "https://ballchasing.com";

const customFetch = async (URL: string, init: RequestInit) => {
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
    return { inError: false, data: json, httpCode: response.status };
  } else {
    return { inError: true, error: json, httpCode: response.status };
  }
};

const useFetch = () => {
  const { run, data, error, status, httpCode } = useAsync();

  const get = useCallback(
    (URL: string, init: RequestInit | undefined) =>
      run(
        customFetch(`${URL}`, {
          method: "GET",
          ...init,
        })
      ),
    [run, customFetch]
  );

  const isResolved = status === requestStatus.resolved;
  const hasError = status === requestStatus.error;
  const isLoading = status === requestStatus.pending;
  const isIdle = status === requestStatus.idle;

  return { get, data, isResolved, hasError, httpCode, isLoading, isIdle };
};

export { useFetch };
