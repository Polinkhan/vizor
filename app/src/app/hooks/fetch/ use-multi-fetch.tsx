import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { getClient } from "../../common/config/client";
import { FetchApiType } from "../../common/types/types.api";

// ------------------------------------------------------------------
// useFetch custom hook for making API requests with axios.
// Parameters:
// - method: HTTP request method (GET, POST, etc.).
// - url: The URL to send the API request.
// - body: The request body for POST requests.
// - dependency: An optional dependency array to trigger re-fetching.
// ------------------------------------------------------------------

type UseMultiFetchType = {
  apis: FetchApiType[];
  dependency?: any[];
};

const useMultiFetch = ({ apis, dependency = [] }: UseMultiFetchType) => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  let controller: AbortController[] = [];

  // Generate a promise for each API to handle GET and POST requests.
  const promiseGenerate = (api: FetchApiType, index: number) => {
    const client = getClient(api.type);
    switch (api.method) {
      //
      case "GET": {
        return client.get(api.url, { signal: controller[index].signal });
      }
      //
      case "POST": {
        return client.post(api.url, api.body, { signal: controller[index].signal });
      }
      //
      case "PUT": {
        return client.put(api.url, api.body, { signal: controller[index].signal });
      }
      //
      case "DELETE": {
        return client.delete(api.url, { signal: controller[index].signal });
      }
    }
  };

  const fetch = async () => {
    const promises = apis.map((api, i) => {
      controller[i] = new AbortController();
      return promiseGenerate(api, i);
    });

    try {
      const res: Array<AxiosResponse> = (await Promise.all(promises)) as Array<AxiosResponse>;
      const data: any = res.map(({ data }) => data);
      setData(data);
    } catch (err: any) {
      if (err?.code === "ERR_CANCELED") {
      } else setError(err);
    }
  };

  useEffect(() => {
    fetch();

    return () => {
      controller.forEach((_) => _.abort());
    };
  }, dependency);

  return { data, error };
};

export default useMultiFetch;
