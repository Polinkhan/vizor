import { useState } from "react";
import { useLocation } from "react-router-dom";

const useRefresh = () => {
  const { pathname } = useLocation();
  const param = pathname.split("/").join("");

  const [refreshAt, setRefreshAt] = useState(Number(localStorage.getItem(param) || 5000));

  const onChange = (e: any) => {
    const value = e.target.value;
    setRefreshAt(value);
    localStorage.setItem(param, value);
  };

  const RefreshProps = { value: refreshAt, onChange };

  return { refreshAt, RefreshProps };
};

export default useRefresh;
