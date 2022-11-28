import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import styles from "styles/ModalPin.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { checkPin } from "src/modules/api/User";
import transferAction from "src/redux/actions/transfer";
const InputPin = dynamic(import("react-code-input"));

const Modal = ({ setOpen, open, amount, receiverId, notes }) => {
  const dispatch = useDispatch();
  const [pin, setPin] = useState(null);
  const token = useSelector((state) => state.auth.userData.token);
  const router = useRouter();
  const pinHandler = (e) => setPin(e);
  // console.log(pin);
  const transferHandler = (e) => {
    e.preventDefault();
    const body = {
      receiverId,
      amount,
      notes,
    };
    checkPin(token, pin)
      .then((res) => {
        if (res.data.status == 200)
          dispatch(transferAction.transferThunk(token, body));
        setOpen(!open);
        router.push("/transfer/status");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.response.data.msg}`);
      });
  };
  console.log(pin);

  return (
    <>
      {open && (
        <div className={styles.modal}>
          <form className={styles["modal-content"]}>
            <div className={styles["modal-header"]}>
              <p className={styles["modal-title"]}>
                Please input your pin to proceed
              </p>
            </div>
            <InputPin fields={6} type="password" onChange={pinHandler} />
            <div className={styles["modal-footer"]}>
              <button
                className={styles.confirm}
                onClick={transferHandler}
                type="submit"
              >
                Confirm
              </button>
              <button onClick={() => setOpen(!open)} className={styles.cancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;
