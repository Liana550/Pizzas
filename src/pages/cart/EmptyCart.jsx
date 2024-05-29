import React, { memo } from "react";
import { CartEmpty } from "../../assets/iconsSvg";
import { Link } from "react-router-dom";
function EmptyCart() {
  return (
    <div className="cartEmpty">
      <div className="cartText">
        <h1>Корзина пустая </h1>
        <h1>😕</h1>
      </div>
      <div>
        <p className="cartContent">
          Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать
          пиццу, перейди на главную страницу.
        </p>
      </div>
      <CartEmpty />
      <p>
        <Link to={"/"}>
          <button>Вернуться назад</button>
        </Link>
      </p>
    </div>
  );
}

export default memo(
  EmptyCart,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
