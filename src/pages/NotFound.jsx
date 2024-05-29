import React, { memo } from "react";

const NotFound = () => {
  return <div className="notFound">Տվյալները բացակայում են</div>;
};

export default memo(
  NotFound,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
