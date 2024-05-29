import React, { memo } from "react";
import { Header } from "../Components";
import { Outlet } from "react-router-dom";
const HomeLayouts = () => {
  return (
    <>
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default memo(
  HomeLayouts,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
