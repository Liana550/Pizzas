import React, { useEffect, useState, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../NotFound";
import { Link } from "react-router-dom";
import { CartSvg, DeleteCart, BackSvg } from "../../assets/iconsSvg";
import EmptyCart from "./EmptyCart";
import FullCart from "./FullCart";
import CartLoading from "./CartLoading";
// import ModalReact from "../../Components/modal/ModalReact";
import { setNotificationStatus } from "../../store/slices/filterSlices/filterSlice";
import { customBaseUrl } from "../../Components/custom/customBaseUrl";
import { setResetBuyCartMessages } from "../../store/slices/cartSlices/cartSlice";
import {
  getCart,
  deleteCart,
  bayCartArray,
} from "../../store/slices/cartSlices/cartSlicesApi";
function Cart() {
  const dispatch = useDispatch();
  const { cartArray, cartLoading, modal, buyCartMessages } = useSelector(
    (store) => {
      return store.cart;
    }
  );

  const [total, setTotal] = useState(0);
  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    if (cartArray.length) {
      setTotal(
        cartArray.reduce(
          (a, b) =>
            a +
            b.subCategories.reduce((m, n) => m + n.count * b.pizzaId.price, 0),
          0
        )
      );
    }
  }, [cartArray]);

  useEffect(() => {
    if (buyCartMessages) {
      if (buyCartMessages === "Ваша покупка удалась") {
        dispatch(
          setNotificationStatus({
            open: true,
            status: true,
            messagesText: buyCartMessages,
          })
        );
      } else {
        dispatch(
          setNotificationStatus({
            open: true,
            status: false,
            messagesText: buyCartMessages,
          })
        );
      }
      dispatch(setResetBuyCartMessages());
    }
  }, [buyCartMessages]);

  const deleteAllCart = useCallback(() => {
    dispatch(deleteCart());
  }, []);
  const loadingArray = [...new Array(5)].map((_, ind) => (
    <CartLoading key={ind} />
  ));
  const bayCart = useCallback(() => {
    const obj = {
      dataCart: cartArray,
      url: customBaseUrl().baseUrl,
    };
    dispatch(bayCartArray(obj));
  }, []);

  useEffect(() => {
    if (customBaseUrl().status === "ok") {
      console.log("ok");
      alert("ok");
    }
  }, []);

  return (
    <div className="cart">
      {/* {modal && <ModalReact text="Ваша покупка удалась" color={"green"} />} */}
      {cartLoading === "loading" ? (
        loadingArray
      ) : cartLoading === "fulfilled" ? (
        cartArray.length ? (
          <div className="cartPizza_parent">
            <div className="cartPizza">
              <div className="cartLogo">
                <CartSvg width={29} height={29} stroke={"#3F3F3F"} />
                <h1>Корзина</h1>
              </div>
              <div className="deletCart">
                <div className="delete" onClick={deleteAllCart}>
                  <DeleteCart />
                </div>
                <p>Очистить корзину</p>
              </div>
            </div>
            <div>
              {cartArray.map((el, index) => (
                <FullCart key={index} {...el} />
              ))}
            </div>
            <div className="price_count">
              <p>
                Всего пицц: <span>{cartArray.length} шт.</span>
              </p>
              <p>
                Сумма заказа: <span className="totalPrice">{total} ₽</span>
              </p>
            </div>
            <div className="buttons">
              <Link to={"/"}>
                <button className="button_left">
                  <BackSvg /> Вернуться назад
                </button>
              </Link>
              <button className="button_right" onClick={bayCart}>
                Оплатить сейчас
              </button>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default memo(
  Cart,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
