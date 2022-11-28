import React, { useEffect, useState } from "react";
import Layout from "src/Components/LayoutAuth";
import PageTitle from "src/Components/Header";
import styles from "styles/CreatePin.module.css";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userAction from "src/redux/actions/user";

const ReactCodeInput = dynamic(import("react-code-input"));

export default function CreatePin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [emptypin, setEmptyPin] = useState(true);
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [showConfirmInput, setShowConfirmInput] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const errorMsg = useSelector((state) => state.user.error);
  const userData = useSelector((state) => state.auth.userData);

  const checkEmptyPin = (pin1, pin2) => {
    if (!pin1 || pin1.length !== 6 || !pin2 || pin2.length !== 6)
      return setEmptyPin(true);
    pin1 && pin2 && setEmptyPin(false);
  };

  const handlerPin1 = (e) => setPin1(`${e}`);
  const handlerPin2 = (e) => setPin2(`${e}`);
  console.log(pin1, pin2);
  const showConfirmHandler = (pin1) => {
    if (pin1.length != 6) return setShowConfirmInput(false);
    return setShowConfirmInput(true);
  };

  const createPinSuccess = () => {
    toast.success(`Congrats! ${body.email} your pin created successfully!`);
    router.push("/");
  };

  const createPinError = () => {
    setShowConfirmInput(false);
    toast.error(`${errorMsg}`);
  };

  const createPinHandler = (e) => {
    e.preventDefault();
    if (pin1 !== pin2) {
      setShowConfirmInput(false);
      return toast.error("Your pin Isn't Matched, Re-enter your pin");
    }
    const body = { pin: pin1 };
    dispatch(
      userAction.editPinThunk(
        userData.token,
        userData.id,
        body,
        createPinSuccess,
        createPinError
      )
    );
  };

  useEffect(() => {
    checkEmptyPin(pin1, pin2);
  }, [pin1, pin2]);

  useEffect(() => {
    showConfirmHandler(pin1);
  }, [pin1]);

  useEffect(() => {
    isLoading && setEmptyPin(true);
  }, [isLoading]);

  return (
    <>
      <PageTitle title="Create Pin" />
      <Layout>
        <h1 className={styles["h1"]}>
          Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That
          You Created Yourself.
        </h1>
        <p className={styles["description"]}>
          Create 6 digits pin to secure all your money and your data in FazzPay
          app. Keep it secret and don`t tell anyone about your FazzPay account
          password and the PIN.
        </p>
        <form onSubmit={createPinHandler} className={styles["form"]}>
          <p className={styles[showConfirmInput ? "confirm-text" : "hide"]}>
            Confirm Your Pin
          </p>
          <div className={styles[showConfirmInput ? "hide" : "code-wrapper"]}>
            <ReactCodeInput type="password" fields={6} onChange={handlerPin1} />
          </div>
          <div className={styles[showConfirmInput ? "code-wrapper" : "hide"]}>
            <ReactCodeInput type="password" fields={6} onChange={handlerPin2} />
          </div>
          <button type="submit" disabled={emptypin}>
            Confirm
          </button>
        </form>
      </Layout>
    </>
  );
}
