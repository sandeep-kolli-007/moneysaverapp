import React from "react";

export default function useNoninitialEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
) {
  let initialRender = React.useRef(true);
  React.useEffect(() => {
    let effectReturns: void | (() => void) = () => {};

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }

    if (effectReturns && typeof effectReturns === "function") {
      return effectReturns;
    }
  }, deps);

  return useNoninitialEffect;
}