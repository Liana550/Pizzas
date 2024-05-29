import React, { memo, useCallback } from "react";

function PizzaSize({ el, style, setStyle, sizes }) {
  const handleStyle = useCallback((arg) => {
    setStyle(arg);
  }, []);
  return (
    <li
      className={
        sizes.includes(el) ? (el === style ? "active" : "") : "disebled"
      }
      onClick={() => handleStyle(el)}
    >
      {el}см.
    </li>
  );
}

export default memo(
  PizzaSize,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
