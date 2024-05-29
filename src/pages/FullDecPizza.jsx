import React, { useCallback, useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { StarReting } from "../assets/iconsSvg";
import { PlusSvg } from "../assets/iconsSvg";
import { BackSvg } from "../assets/iconsSvg";
import { getOnePizza } from "../store/slices/pizzasSlices/pizzasSlicesApi";
import { getCart, addCart } from "../store/slices/cartSlices/cartSlicesApi";
const typeArray = ["тонкое", "традиционное"];
const sizeArray = [26, 30, 40];
const FullDecPizza = () => {
  const { id } = useParams();
  const dispach = useDispatch();
  const [type, setType] = useState(null);
  const [size, setSize] = useState(null);
  const { onePizzaloading, onePizza } = useSelector((store) => {
    return store.pizza;
  });

  const { cartObj, cartArray } = useSelector((store) => {
    return store.cart;
  });
  const ratingArray = [...new Array(10)];
  const cartArrayFind = cartArray.find((el) => el.pizzaId._id === id);
  const count = cartArrayFind ? cartArrayFind.totalCount : 0;
  useEffect(() => {
    dispach(getCart());
  }, [cartObj]);
  useEffect(() => {
    dispach(getOnePizza(id));
  }, [id]);
  useEffect(() => {
    if (onePizza) {
      setType(onePizza.types[0]);
      setSize(onePizza.sizes[0]);
      // setRatingArray([...new Array(onePizza.rating)]);
    }
  }, [id, onePizza]);
  const handleType = useCallback((arg) => {
    setType(arg);
  }, []);
  const handleSize = useCallback((arg) => {
    setSize(arg);
  }, []);
  const sendCart = useCallback(() => {
    const obj = {
      pizzaId: id,
      type: `${type}`,
      size: `${size}`,
    };
    dispach(addCart(obj));
  }, [type, size, id]);

  return (
    <div className="fullPizza">
      {onePizzaloading === "loading" ? (
        <div>loading</div>
      ) : onePizza ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "30px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <p className="pizzaName">{onePizza.title}</p>
              <div>
                {" "}
                {ratingArray.map((_, index) => (
                  <StarReting
                    key={index}
                    fill={index <= onePizza.rating - 1 ? "#eb5a1e" : "#d3d3d3"}
                  />
                ))}
              </div>
            </div>
            <img src={onePizza.imageUrl} alt={onePizza.title} />
            <div className="size">
              <p className="price"> от {onePizza.price} ₽</p>
              <ul>
                {sizeArray.map((el, ind) => (
                  <li
                    key={ind}
                    className={
                      onePizza.sizes.includes(el)
                        ? size === el
                          ? "active"
                          : ""
                        : "disebled"
                    }
                    onClick={() => handleSize(el)}
                  >
                    {el}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul>
                {typeArray.map((el, ind) => (
                  <li
                    key={ind}
                    className={
                      onePizza.types.includes(ind)
                        ? type === ind
                          ? "active"
                          : ""
                        : "disebled"
                    }
                    onClick={() => handleType(ind)}
                  >
                    {el}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pizzaText">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              aperiam ratione fugiat iste fuga officiis vero. Perferendis nihil
              iste illum corrupti dicta quisquam quasi expedita magni maxime
              quam possimus rem harum nisi, molestiae neque esse porro totam.
              Nostrum nam tenetur veritatis illum nobis. Numquam quo molestias
              praesentium quisquam accusantium doloribus.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                marginTop: "30px",
                gap: "20px",
              }}
            >
              <div
                className="countButton"
                onClick={sendCart}
                style={{ padding: "10px", width: count ? "155px" : "132px" }}
              >
                <p>
                  <PlusSvg />
                </p>
                <p>Добавить </p>
                {count > 0 && <div className="count">{count}</div>}
              </div>
              <Link to={"/"}>
                <button className="button">
                  <BackSvg /> Вернуться назад
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default memo(
  FullDecPizza,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
