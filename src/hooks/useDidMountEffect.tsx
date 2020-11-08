import { useEffect, useRef } from "react";
import * as React from "react";

const useDidMountEffect = (
  func: React.EffectCallback,
  deps: React.DependencyList
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useDidMountEffect;
