import dynamic from "next/dynamic";
import styles from "src/styles/Modal.module.css";
const ReactCodeInput = dynamic(import("react-code-input"));

const ModalConfirm = ({ open, setOpen }) => {
  return (
    <>
      {open && (
        <div>
          <div className={styles.modal}>
            <div className={styles["modal-content"]}>
              <div className={styles["pin-container"]}>
                <div className={styles.title}>
                  <h2 className={styles["h2"]}>Enter PIN to Transfer</h2>
                  <p className={styles["description"]}>
                    Enter your 6 digits Fazzpay PIN for confirmation to continue
                    transfering money.
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
                    <div onClick={() => setOpen(!open)}>
                      <button type="submit" className="btn btn-primary">
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/*<div className={styles.modal}>
            <div className={styles["modal-content"]}>
              <div className={styles["modal-header"]}>
                <p className={styles["modal-title"]}>Logout</p>
              </div>
              <div className={styles["modal-body"]}>Are you sure?</div>
              <div className={styles["modal-footer"]}>
                <button className={styles.button}>yes</button>
                <button
                  className={styles.button}
                  onClick={() => setOpen(!open)}
                >
                  no
                </button>
              </div>
            </div>
          </div>*/}
        </div>
      )}
    </>
  );
};

export default ModalConfirm;
