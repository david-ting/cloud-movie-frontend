import { useMemo, useRef } from "react";
import { throttle } from "throttle-debounce";

function useCancellableThrottle(fetchRequest) {
  const abortControllerRef = useRef(null);

  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const cancellableThrottle = useMemo(
    () =>
      throttle(200, false, (...args) => {
        cancelRequest();
        abortControllerRef.current = new AbortController();

        fetchRequest(...args, abortControllerRef.current);
      }),
    [fetchRequest]
  );

  return { cancellableThrottle, cancelRequest };
}

export default useCancellableThrottle;
