import React, { useLayoutEffect, useState } from "react";

function useParentSize(child) {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([
        child.current.parentElement.offsetWidth,
        child.current.parentElement.offsetWidth,
      ]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [child]);
  return size;
}

export default useParentSize;
