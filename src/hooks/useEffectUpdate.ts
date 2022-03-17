import { useEffect, useRef } from "react";

export const useEffectUpdate = (cb: Function, dependencies: any[]) => {
  const updated = useRef(false);

  useEffect(() => {
    if (!updated.current) {
      updated.current = true;
      return;
    }

    cb();
    // eslint-disable-next-line
  }, dependencies);
};
