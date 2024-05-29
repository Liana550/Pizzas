import React, { memo, useCallback } from "react";
import { useEffect } from "react";
import { getPizza } from "../store/slices/pizzasSlices/pizzasSlicesApi";
import { getCart } from "../store/slices/cartSlices/cartSlicesApi";
import { useSelector, useDispatch } from "react-redux";
import { setPageNumber } from "../store/slices/pizzasSlices/pizassSlices";
import { Sort, Type, LoadingPizza, PizzaBlock } from "../Components";
import Pagination from "../Components/pageNumbers/Pagination";
import NotFound from "./NotFound";
const Home = () => {
  const dispatch = useDispatch();
  const { loading, dataPizza, pageCount, pageNumber, infoMessage } =
    useSelector((store) => {
      return store.pizza;
    });
  const { search, sortStyle, typeStyle } = useSelector((store) => {
    return store.filter;
  });
  const { cartObj } = useSelector((store) => {
    return store.cart;
  });
  useEffect(() => {
    dispatch(getCart());
  }, [cartObj]);
  useEffect(() => {
    dispatch(getPizza({ pageNumber, search, sortStyle, typeStyle }));
  }, [pageNumber, search, sortStyle, typeStyle]);
  const changePage = useCallback((arg) => {
    dispatch(setPageNumber(arg));
  }, []);
  const pizzas =
    dataPizza.length && !infoMessage ? (
      dataPizza.map((obj) => <PizzaBlock key={obj._id} {...obj} />)
    ) : (
      <div>{infoMessage}</div>
    );
  const loadingJsx = [...new Array(6)].map((_, idx) => (
    <LoadingPizza key={idx} />
  ));
  return (
    <>
      <div className="categoria">
        <Type />
        <Sort />
      </div>
      <div className="products">
        {loading === "rejected" ? (
          <NotFound />
        ) : (
          <>
            <h1>Все пиццы</h1>
            <div className="pizza">
              {loading === "loading" ? (
                loadingJsx
              ) : loading === "fulfilled" && dataPizza.length ? (
                <div>
                  <div className="pizza">{pizzas}</div>
                  <div className="pageBox">
                    <Pagination
                      pageCount={pageCount}
                      pageNumber={pageNumber}
                      handlePageClick={changePage}
                    />
                  </div>
                </div>
              ) : (
                <NotFound />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default memo(
  Home,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
