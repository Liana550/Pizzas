import ContentLoader from "react-content-loader";

const CartLoading = () => (
  <ContentLoader
    speed={2}
    width={700}
    height={260}
    viewBox="0 0 700 260"
    backgroundColor="#ddd5d9"
    foregroundColor="#c9c5c5"
  >
    <rect x="118" y="63" rx="0" ry="0" width="0" height="14" />
    <rect x="131" y="23" rx="0" ry="0" width="4" height="0" />
    <circle cx="111" cy="106" r="64" />
    <rect x="34" y="188" rx="0" ry="0" width="159" height="41" />
    <rect x="293" y="100" rx="0" ry="0" width="346" height="57" />
  </ContentLoader>
);

export default CartLoading;
