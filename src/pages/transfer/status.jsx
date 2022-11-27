import React from "react";
import Image from "next/image";
import styles from "styles/status.module.css";
import Sidebar from "components/Sidebar";
import profile from "src/assets/profile.png";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useRouter } from "next/router";

function Status() {
  const router = useRouter();
  return (
    <>
      <Header title={"Status"} />
      <Navbar>
        <div className={styles["main-status"]}>
          <div className="col-lg-3">
            <Sidebar />
          </div>
          <div className={`col-lg-9 ${styles["status-info"]}`}>
            <div className={styles.status}>
              {/* {props.transferResult.status &&
              props.transferResult.status === 200 ? (
                <i className={`bi bi-check-lg`}></i>
              ) : (
                <i className={`bi bi-x-lg`}></i>
              )} */}
            </div>
            <p className={styles["status-text"]}>
              {/* {props.transferResult.msg || ""} */}
            </p>
            <div className={styles["info"]}>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Amount</p>
                <p className={styles["info-value"]}>
                  {/* {`Rp. ${
                    currencyPeriod(props.transferResult.data.amount) || ""
                  }`} */}
                </p>
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Balance Left</p>
                <p className={styles["info-value"]}>
                  {/* {`Rp. ${
                    currencyPeriod(props.transferResult.data.balance) || ""
                  }`} */}
                </p>
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Date & Time</p>
                <p className={styles["info-value"]}>
                  {/* {Date(props.transferData.date) || ""} */}
                </p>
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Notes</p>
                <p className={styles["info-value"]}>
                  {/* {props.transferResult.data.notes || "-"} */}
                </p>
              </div>
            </div>
            <section className={styles["receiver"]}>
              <p className={styles["title"]}>Transfer to</p>
              <div className={styles["contact-item"]}>
                <div className={styles["img"]}>
                  <Image
                    src={profile}
                    placeholder={"empty"}
                    alt="profile"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={styles["name-phone"]}>
                  <p className={styles["name"]}>
                    Putra Ganteng
                    {/* {`${props.transferData.receiverData.firstName} ${props.transferData.receiverData.lastName}`} */}
                  </p>
                  <p className={styles["phone"]}>
                    0800-0800-0800
                    {/* {props.transferData.receiverData.noTelp | "-"} */}
                  </p>
                </div>
              </div>
            </section>
            <section className={styles["buttons"]}>
              <a href="" target="_blank" rel="noreferrer">
                <button className={`btn ${styles["download"]}`}>
                  <i
                    className={`fa fa-download ${styles["icon-fontawesome"]}`}
                    aria-hidden="true"
                  ></i>
                  Download PDF
                </button>
              </a>
              <button
                className={`btn btn-primary ${styles["home"]}`}
                onClick={() => {
                  router.push("/home/test");
                }}
              >
                Back to Home
              </button>
            </section>
          </div>
        </div>
        <Footer />
      </Navbar>
    </>
  );
}

export default Status;
