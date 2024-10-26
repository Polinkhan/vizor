import { useState } from "react";

const useRerender = () => {
  const [render, setRender] = useState(new String(""));
  const reRender = () => setRender(new String(""));
  return { render, reRender };
};

export default useRerender;
