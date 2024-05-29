import React from "react";
import { CrossIcon, CheckIcons } from "../../assets/iconsSvg";
import { useSelector, useDispatch } from "react-redux";
import { setNotificationStatus } from "../../store/slices/filterSlices/filterSlice";
const CustomNotification = () => {
  const { notificationStatus } = useSelector((store) => store.filter);
  const dispatch = useDispatch();
  React.useEffect(() => {
    let timOut = null;
    if (notificationStatus?.open) {
      timOut = setTimeout(() => {
        console.log(notificationStatus, 8888);
        dispatch(
          setNotificationStatus({
            open: null,
            status: notificationStatus.staus,
            messagesText: notificationStatus.messagesText,
          })
        );
      }, 6000);
    }

    return () => clearInterval(timOut);
  }, [notificationStatus]);

  return (
    <di
      className="CustomNotification"
      style={{
        backgroundColor: notificationStatus?.status ? "green" : "red",
        transform: notificationStatus?.open
          ? "translateX(-10px)"
          : "translateX(300px)",
        opacity: notificationStatus?.open ? "1" : "0",
      }}
    >
      <div className="CustomNotification-child">
        {notificationStatus?.status ? <CheckIcons /> : <CrossIcon />}

        <p>{notificationStatus?.messagesText}</p>
      </div>
    </di>
  );
};

export default CustomNotification;
