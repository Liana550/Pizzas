import React, { useEffect, useRef, useState, memo } from "react";
import { SortSvg } from "../../assets/iconsSvg";
import { useDispatch, useSelector } from "react-redux";
import { setSortStyle } from "../../store/slices/filterSlices/filterSlice";
const sortArray = [
  {
    type: "Все",
    sortProperty: null,
  },
  {
    type: "популярности (DESC)",
    sortProperty: "rating",
  },
  {
    type: "популярности (ASC)",
    sortProperty: "-rating",
  },
  {
    type: "по цене (DESC)",
    sortProperty: "price",
  },
  {
    type: "по цене (ASC)",
    sortProperty: "-price",
  },
  {
    type: "по алфавиту (DESC)",
    sortProperty: "Titel",
  },
  {
    type: "по алфавиту (ASC)",
    sortProperty: "-Titel",
  },
];

function Sort() {
  const { sortStyle } = useSelector((store) => {
    return store.filter;
  });
  const [open, setOpen] = useState(false);
  const sortRef = useRef(null);
  const dispach = useDispatch();

  useEffect(() => {
    const mouseclick = (e) => {
      const path = e.composedPath ? e.composedPath() : e.path;
      if (!path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", mouseclick);
    return () => window.removeEventListener("click", mouseclick);
  }, []);

  const hendleClickItem = React.useCallback((obj) => {
    dispach(setSortStyle(obj));
    setOpen(false);
  }, []);

  return (
    <div className="sortParent" ref={sortRef} onClick={() => setOpen(!open)}>
      <SortSvg />
      <p className="firstText">Сортировка по:</p>
      <p className="filter">{sortStyle.type}</p>
      {open && (
        <div className="sortList">
          <ul>
            {sortArray.map((el, index) => (
              <li
                key={index}
                onClick={() => hendleClickItem(el)}
                className={sortStyle.type === el.type ? "active" : ""}
              >
                {el.type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default memo(
  Sort,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
