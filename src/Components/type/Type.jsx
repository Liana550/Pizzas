import React, { memo, useCallback } from "react";
import { setTypeStyle } from "../../store/slices/filterSlices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const menuArray = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
function Type() {
  const dispach = useDispatch();
  const handleClick = useCallback((arg) => {
    dispach(setTypeStyle(arg));
  }, []);
  const { typeStyle } = useSelector((store) => {
    return store.filter;
  });
  return (
    <div className="contentMenu">
      <ul>
        {menuArray.map((el, index) => (
          <li
            key={index}
            onClick={() => handleClick(index)}
            className={typeStyle === index ? "active" : ""}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(
  Type,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
