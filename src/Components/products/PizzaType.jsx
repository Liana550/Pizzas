import React, { memo, useCallback } from "react";
function PizzaType({ el, types, index, style, setStyle }) {
  const handleType = useCallback((arg) => {
    setStyle(arg);
  }, []);
  return (
    <li
      className={
        types.includes(index) ? (style === index ? "active" : "") : "disebled"
      }
      onClick={() => handleType(index)}
    >
      {el}
    </li>
  );
}

export default memo(
  PizzaType,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
