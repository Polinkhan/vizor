import { useEffect, useState } from "react";
import { FetchApiType } from "../../common/types/types.api";
import { getClient } from "../../common/config/client";

interface useIntervalFetchProps {
  api: FetchApiType;
  dependency?: any[];
  intervalTime?: number | string;
}

const useIntervalFetch = ({ api, dependency = [], intervalTime = 5000 }: useIntervalFetchProps) => {
  if (typeof intervalTime === "string") intervalTime = parseInt(intervalTime);
  const [data, setData] = useState();
  let controller: AbortController;

  const fetch = async () => {
    controller = new AbortController();

    const client = getClient();

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
    } catch (err: any) {}
  };

  useEffect(() => {
    fetch();
    const interval_id = setInterval(fetch, intervalTime);
    return () => {
      controller.abort();
      clearInterval(interval_id);
    };
  }, [...dependency, intervalTime]);

  return { data } as { error: any; data: any };
};

export default useIntervalFetch;
