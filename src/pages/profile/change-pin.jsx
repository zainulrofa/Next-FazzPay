import dynamic from "next/dynamic";
import Header from "src/Components/Navbar";
import Sidebar from "src/Components/Sidebar";
import Footer from "src/Components/Footer";
const ReactCodeInput = dynamic(import("react-code-input"));

import styles from "styles/ChangePin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import userAction from "src/redux/actions/user";
import { toast } from "react-toastify";

function CreatePin() {
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
    toast.success(`Congrats! Your pin updated successfully!`);
    router.push("/profile");
  };

  const createPinError = () => {
    setShowConfirmInput(false);
    toast.error(`${errorMsg}`);
  };

  const editPinHandler = (e) => {
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
        createPinSuccess()
        // createPinError
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
      <Header />
      <div className={styles["main-container"]}>
        <div className="container">
          <div className={`row ${styles["main-content"]}`}>
            <div className="col-lg-3 col-md-4">
              <Sidebar />
            </div>
            <div className="col-lg-9 col-md-8 col-12">
              <div className={styles["pin-container"]}>
                <div className={styles.title}>
                  <h2 className={styles["h2"]}>Change PIN</h2>
                  {!showConfirmInput ? (
                    <p className={styles["description"]}>
                      Enter your current 6 digits Fazzpay PIN below to continue
                      to the next steps.
                    </p>
                  ) : (
                    <p className={styles["description"]}>
                      Type your new 6 digits security PIN to use in Fazzpay.
                    </p>
                  )}
                </div>
                {/* <div className={styles["form-container"]}>
              <form className={styles["form"]}>
                <div className={styles["otp-input"]}>
                  <ReactCodeInput
                    type="password"
                    fields={6}
                    className={styles["otp-box"]}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Confirm
                </button>
              </form>
            </div> */}
                <form onSubmit={editPinHandler} className={styles["form"]}>
                  <p
                    className={
                      styles[showConfirmInput ? "confirm-text" : "hide"]
                    }
                  >
                    Confirm Your Pin
                  </p>
                  <div
                    className={
                      styles[showConfirmInput ? "hide" : "code-wrapper"]
                    }
                  >
                    <ReactCodeInput
                      type="password"
                      fields={6}
                      onChange={handlerPin1}
                    />
                  </div>
                  <div
                    className={
                      styles[showConfirmInput ? "code-wrapper" : "hide"]
                    }
                  >
                    <ReactCodeInput
                      type="password"
                      fields={6}
                      onChange={handlerPin2}
                    />
                  </div>
                  {!showConfirmInput ? (
                    <button type="submit" disabled={emptypin}>
                      Confirm
                    </button>
                  ) : (
                    <button type="submit" disabled={emptypin}>
                      Change PIN
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreatePin;
