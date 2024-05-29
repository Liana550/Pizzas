import React, { useCallback, memo } from "react";
import { PlusSvg } from "../../assets/iconsSvg";
import { useState } from "react";
import PizzaType from "./PizzaType";
import PizzaSize from "./PizzaSize";
import { addCart } from "../../store/slices/cartSlices/cartSlicesApi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const typeArray = ["тонкое", "традиционное"];
const sizeArray = [26, 30, 40];

function PizzaBlock({ title, price, imageUrl, types, sizes, _id }) {
  const [styleType, setStyleType] = useState(types[0]);
  const [styleSize, setStyleSize] = useState(sizes[0]);
  const dispatch = useDispatch();
  const findPizza = useSelector((store) =>
    store.cart.cartArray.find((el) => el.pizzaId._id === _id)
  );
  const count = findPizza ? findPizza.totalCount : 0;

  const sendCart = useCallback(() => {
    const obj = {
      pizzaId: _id,
      type: `${styleType}`,
      size: `${styleSize}`,
    };
    console.log(obj);
    dispatch(addCart(obj));
  }, [styleSize, styleType]);
  console.log("reRender");
  return (
    <div className="pizzaBlock">
      <Link to={`/pizzas/${_id}`}>
        <div className="pizzaImg">
          <div>
            <img src={imageUrl} alt={title} />
          </div>
          <p className="pizzaName">{title}</p>
        </div>
      </Link>
      <div className="pizzaSort">
        <div className="pizzaBlock_type">
          <ul>
            {typeArray.map((elem, index) => (
              <PizzaType
                key={index}
                el={elem}
                types={types}
                index={index}
                style={styleType}
                setStyle={setStyleType}
              />
            ))}
          </ul>
        </div>
        <div className="pizzaBlock_sizes">
          <ul>
            {sizeArray.map((elem, index) => (
              <PizzaSize
                key={index}
                el={elem}
                sizes={sizes}
                style={styleSize}
                setStyle={setStyleSize}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="pizzaBlock_price">
        <p className="price"> от {price} ₽</p>
        <div
          className="countButton"
          onClick={sendCart}
          style={{ width: count ? "155px" : "132px" }}
        >
          <p>
            <PlusSvg />
          </p>
          <p>Добавить </p>
          {count > 0 && <div className="count">{count}</div>}
        </div>
      </div>
    </div>
  );
}

export default memo(
  PizzaBlock,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
