import React, { useEffect, useState } from "react";
import Layout from "components/LayoutAuth";
import PageTitle from "components/Header";
import styles from "styles/CreatePin.module.css";
import dynamic from "next/dynamic";

const ReactCodeInput = dynamic(import("react-code-input"));

export default function CreatePin() {
  const [emptypin, setEmptyPin] = useState(true);
  const [pin, setPin] = useState(null);

  const checkEmptyPin = (pin) => {
    if (!pin || pin.length !== 6) return setEmptyPin(true);
    pin && setEmptyPin(false);
  };

  const changehandler = (e) => setPin(e);
  useEffect(() => {
    checkEmptyPin(pin);
  }, [pin]);

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
          app. Keep it secret and don’t tell anyone about your FazzPay account
          password and the PIN.
        </p>
        <form className={styles["form"]}>
          <div className={styles["code-wrapper"]}>
            <ReactCodeInput
              type="password"
              fields={6}
              onChange={changehandler}
            />
          </div>
          <button type="submit" disabled={emptypin}>
            Confirm
          </button>
        </form>
      </Layout>
    </>
  );
}
