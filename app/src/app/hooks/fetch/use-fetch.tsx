import { useState, useEffect } from "react";
import axios from "axios";
import { ErrorType, FetchApiType } from "../../common/types/types.api";
import { getClient } from "../../common/config/client";

// ------------------------------------------------------------------
// useFetch custom hook for making API requests with axios.
// Parameters:
// - method: HTTP request method (GET, POST, etc.).
// - url: The URL to send the API request.
// - body: The request body for POST requests.
// - dependency: An optional dependency array to trigger re-fetching.
// ------------------------------------------------------------------

interface UseFetchProps {
  api: FetchApiType;
  dependency?: any[];
}

type UseFetchReturnType = {
  data: any | undefined;
  error: ErrorType | undefined;
};

const useFetch = ({ api, dependency = [] }: UseFetchProps) => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<ErrorType>();
  let controller: AbortController;

  useEffect(() => {
    controller = new AbortController();

    (async () => {
      const client = getClient(api.type);

      try {
        switch (api.method) {
          //
          case "GET": {
            const { data } = await client.get(api.url, { signal: controller.signal });
            setData(data);
            break;
          }
          //
          case "POST": {
            const { data } = await client.post(api.url, api.body, { signal: controller.signal });
            setData(data);
            break;
          }
          //
          case "PUT": {
            const { data } = await client.put(api.url, api.body, { signal: controller.signal });
            setData(data);
            break;
          }
          //
          case "DELETE": {
            const { data } = await client.delete(api.url, { signal: controller.signal });
            setData(data);
            break;
          }
        }

        setError(undefined);
      } catch (err) {
        // ------------------------------------------
        // Only Accept AxiosError and TypeError
        // ------------------------------------------
        if (axios.isAxiosError(err)) {
          if (err.code !== "ERR_CANCELED") {
            setError({ type: "AxiosError", message: err.response?.data });
          }
        } else if (err instanceof TypeError) {
          setError({ type: "TypeError", message: err.message });
        }
      }
    })();

    return () => controller.abort();
  }, dependency);

  return { data, error } as UseFetchReturnType;
};

export default useFetch;
