import React, { memo, useCallback } from "react";
import ReactModal from "react-modal";
import { setModal } from "../../store/slices/cartSlices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // color: "white",
  },
};
function ModalReact({ text, color }) {
  const { modal } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const closeModal = useCallback(() => {
    console.log(888);
    dispatch(setModal(false));
  }, []);
  const modalIsOpen = useCallback(() => {
    dispatch(setModal(true));
  }, []);
  const afterOpenModal = useCallback(() => {
    customStyles.content.background = color;
  }, []);
  return (
    <div>
      <ReactModal
        isOpen={modal}
        onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ textAlign: "end" }}>
          <button onClick={closeModal}>close</button>
        </div>
        <div style={{ marginTop: "30px" }}>{text}</div>
      </ReactModal>
    </div>
  );
}

export default memo(
  ModalReact,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
