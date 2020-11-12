import { useRef } from "react";

const useComponentWillMount = (func: any) => {
  const willMount = useRef(true);

  if (willMount.current) func();

  willMount.current = false;
};

export default useComponentWillMount;
