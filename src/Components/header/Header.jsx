import React from "react";
import { memo } from "react";
import { useLocation } from "react-router-dom";
import Search from "./Search";
import { CartSvg } from "../../assets/iconsSvg";
import { LogoIcon } from "../../assets/iconsSvg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
  const location = useLocation();
  const { cartArray } = useSelector((store) => {
    return store.cart;
  });
  const totalCart = cartArray.length
    ? cartArray.reduce((a, b) => a + b.totalPrice, 0)
    : 0;
  return (
    <div className="header">
      <Link to={"/"}>
        <div className="headerLogo">
          <div className="logo">
            <LogoIcon />
          </div>
          <div className="logoText">
            <h2>REACT PIZZA</h2>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </div>
      </Link>
      {location.pathname === "/cart" ? (
        ""
      ) : (
        <div className="headerRight">
          {location.pathname === "/" ? <Search /> : ""}
          <Link to={"/cart"}>
            <div className="headerButton">
              <div className="buttonPrice">{totalCart} ₽</div>
              <div className="buttonCount">
                <CartSvg width={18} height={18} stroke={"white"} />
                <div>{cartArray.length}</div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default memo(
  Header,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
