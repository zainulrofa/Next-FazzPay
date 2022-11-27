import dynamic from "next/dynamic";
import Header from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "src/components/Footer";
const ReactCodeInput = dynamic(import("react-code-input"));

import styles from "styles/changepin.module.css";

function CreatePin() {
  return (
    <>
      <Header />
      <div className={styles["main-container"]}>
        <div className="col-lg-3 col-md-4">
          <Sidebar />
        </div>
        <div className="col-lg-9 col-md-8 col-12">
          <div className={styles["pin-container"]}>
            <div className={styles.title}>
              <h2 className={styles["h2"]}>Change PIN</h2>
              <p className={styles["description"]}>
                Enter your current 6 digits Fazzpay PIN below to continue to the
                next steps.
              </p>
            </div>
            <div className={styles["form-container"]}>
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreatePin;
