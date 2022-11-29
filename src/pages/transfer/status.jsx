import React from "react";
import Image from "next/image";
import styles from "styles/status.module.css";
import Sidebar from "src/Components/Sidebar";
// import profile from "src/assets/profile.png";
import imgDefault from "src/assets/avatar.webp";
import Header from "src/Components/Header";
import Navbar from "src/Components/Navbar";
import Footer from "src/Components/Footer";
import { currency } from "src/modules/helpers/currency";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Status() {
  const transferResult = useSelector((state) => state.transfer.transferResult);
  const { status, data } = transferResult;
  const transferData = useSelector((state) => state.transfer.transferData);
  const userBalance = useSelector((state) => state.user.profile.balance);
  const { receiverData } = transferData;
  const link = process.env.CLOUDINARY_LINK;
  const newDate = new Date();
  const month = newDate.toLocaleString("en-US", { month: "long" });
  const year = newDate.getFullYear();
  const date = newDate.getDate();
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  // const dateInfo = `${transferData.date.toLocaleString("en-US", {
  //   month: "long",
  // })} ${transferData.date.getData()}, ${transferData.date.getFullYear()} ${transferData.date.getHours()}.${transferData.date.getMinutes()}`;

  const router = useRouter();
  return (
    <>
      <Header title={"Status"} />
      <Navbar>
        <div className={styles["main-status"]}>
          <div className="col-lg-3 ">
            <Sidebar />
          </div>
          <div className={`col-lg-9 col-12 ${styles["status-info"]}`}>
            {status == 200 ? (
              <>
                <div className={styles["success"]}>
                  <i className={"fa-solid fa-check"}></i>
                </div>
                <p className={styles["status-text"]}>
                  <p>Transfer Success</p>
                </p>
              </>
            ) : (
              <>
                <div className={styles["failed"]}>
                  <i className={"fa-sharp fa-solid fa-x"}></i>
                </div>
                <p className={styles["status-text"]}>
                  <p>Transfer Failed</p>
                </p>
              </>
            )}
            <div className={styles["info"]}>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Amount</p>
                <p className={styles["info-value"]}>
                  {`Rp. ${currency(transferData.amount)}`}
                </p>
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Balance Left</p>
                <p className={styles["info-value"]}>
                  {`Rp. ${currency(userBalance - transferData.amount)}`}
                </p>
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Date & Time</p>
                <p className={styles["info-value"]}>
                  {month} {date}, {year} - {hour}.{minute}
                </p>
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Notes</p>
                <p className={styles["info-value"]}>{transferData.notes}</p>
              </div>
            </div>
            <section className={styles["receiver"]}>
              <p className={styles["title"]}>Transfer to</p>
              <div className={styles["contact-item"]}>
                <div className={styles["img"]}>
                  <Image
                    src={`${link}/${receiverData.image}` || imgDefault}
                    placeholder={"empty"}
                    alt="profile"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={styles["name-phone"]}>
                  <p className={styles["name"]}>
                    {`${receiverData.firstName} ${receiverData.lastName}`}
                  </p>
                  <p className={styles["phone"]}>{receiverData.noTelp}</p>
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
