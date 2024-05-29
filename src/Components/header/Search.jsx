import React, { useCallback, useState, memo } from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearch } from "../../store/slices/filterSlices/filterSlice";
import { DeleteInp } from "../../assets/iconsSvg";
const Search = () => {
  const dispach = useDispatch();
  const [velInp, setVelInp] = useState("");
  const changeInp = (tex) => {
    setVelInp(tex);
    serchInp(tex);
  };
  const serchInp = useCallback(
    debounce((arg) => {
      dispach(setSearch(arg));
    }, 500),
    []
  );

  return (
    <div className="search">
      <div className="serchParent">
        <input
          type="text"
          placeholder="Search"
          value={velInp}
          onChange={(e) => changeInp(e.target.value)}
        />
        {velInp && (
          <div className="deleteInp" onClick={() => changeInp("")}>
            <DeleteInp />
          </div>
        )}
      </div>
      <span className="iconSearch">
        <i className="fa fa-search"></i>
      </span>
    </div>
  );
};

export default memo(
  Search,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
