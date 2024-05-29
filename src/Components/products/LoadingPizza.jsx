import React, { memo } from "react";
import ContentLoader from "react-content-loader";

const LoadingPizza = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#ddd5d9"
    foregroundColor="#c9c5c5"
  >
    <rect x="118" y="63" rx="0" ry="0" width="0" height="14" />
    <rect x="131" y="23" rx="0" ry="0" width="4" height="0" />
    <circle cx="142" cy="146" r="138" />
    <rect x="95" y="293" rx="0" ry="0" width="120" height="18" />
    <rect x="36" y="324" rx="0" ry="0" width="273" height="79" />
    <rect x="40" y="428" rx="0" ry="0" width="85" height="14" />
    <rect x="206" y="426" rx="0" ry="0" width="76" height="18" />
  </ContentLoader>
);

export default memo(
  LoadingPizza,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
