import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Minus, Plus, Delete, DeleteInp } from "../../assets/iconsSvg";
import {
  deletePizza,
  deleteOnePizza,
  changePizzaCount,
} from "../../store/slices/cartSlices/cartSlicesApi";
import { Link } from "react-router-dom";
import {
  setdeletePizzaOneId,
  setdeletePizzaId,
} from "../../store/slices/cartSlices/cartSlice";
const typeArray = ["тонкое", "традиционное"];
function FullCart({ pizzaId, subCategories, _id }) {
  const dispatch = useDispatch();
  const handleDeletePizza = useCallback(() => {
    dispatch(deletePizza(pizzaId._id));
    dispatch(setdeletePizzaId(pizzaId._id));
  }, [_id]);
  const handleDeleteOnePizza = useCallback((arg) => {
    const obj = {
      itemId: arg,
    };
    dispatch(deleteOnePizza(obj));

    dispatch(setdeletePizzaOneId(arg));
  }, []);
  const countUp = useCallback((arg) => {
    const obj = {
      itemId: arg._id,
      count: arg.count + 1,
    };
    dispatch(changePizzaCount(obj));
  }, []);
  const countDowun = useCallback((arg) => {
    const obj = {
      itemId: arg._id,
      count: arg.count === 1 ? 1 : arg.count - 1,
    };
    dispatch(changePizzaCount(obj));
  }, []);
  return (
    <div className="onePizza" key={_id}>
      <Link to={`/pizzas/${pizzaId._id}`} className="link" key={_id}>
        <div className="pizzaName">
          <div>
            <img src={pizzaId.imageUrl} alt={pizzaId.title} />
            <p className="name">{pizzaId.title}</p>
          </div>
        </div>
      </Link>
      <div
        className="pizzaBox_Parent"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {subCategories.map((elem) => (
          <div className="pizzaBox" key={elem._id}>
            <p className="type">
              {typeArray.find((_, ind) => elem.type === ind)} тесто, {elem.size}{" "}
              см.
            </p>
            <div
              className="typeCount"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                justifyContent: "space-between",
              }}
            >
              <div className="pizzaCount">
                <div
                  className="minus"
                  onClick={() => {
                    countDowun(elem);
                  }}
                >
                  <Minus />
                </div>
                <p style={{ fontSize: "22px", width: "12px" }}>{elem.count}</p>
                <div
                  className="plus"
                  onClick={() => {
                    countUp(elem);
                  }}
                >
                  <Plus />
                </div>
              </div>
              <div className="pizzaPrice">{elem.count * pizzaId.price} ₽</div>
              {subCategories.length > 1 && (
                <div
                  className="delete"
                  onClick={() => handleDeleteOnePizza(elem._id)}
                >
                  <DeleteInp />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="deleteAll" onClick={handleDeletePizza}>
        <Delete />
      </div>
    </div>
  );
}

export default memo(
  FullCart,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
