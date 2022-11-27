import React, { useState } from "react";
import Image from "next/image";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import css from "styles/Confirmation.module.css";
import user from "src/assets/1.png";
import { useRouter } from "next/router";
// import { toast } from "react-toastify";
import Modal from "src/components/ModalConfirm";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  // const router = useRouter();
  const modalhandler = () => setModalOpen(!modalOpen);
  return (
    <>
      <Header title={"HOME"} />
      <Navbar />
      <div className={css.container}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <section className={css.side}>
          <aside className={css["bottom-right"]}>
            <div className={css["right-top"]}>
              <p className={css["transaction"]}>Transfer To</p>
            </div>
            <div className={css["card"]}>
              <div className={css["image-name"]}>
                <Image src={user} alt="user" width={56} height={56} />
                <div>
                  <p className={css["username"]}>Samuel Suhi</p>
                  <p className={css.status}>+62 8139 3877 7946</p>
                </div>
              </div>
            </div>
            <div className={css["right-top2"]}>
              <p className={css["transaction"]}>Details</p>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Amount</p>
                <p className={css.subdetails}>Rp100.000</p>
              </div>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Balance</p>
                <p className={css.subdetails}>Rp20.000</p>
              </div>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Date & Time</p>
                <p className={css.subdetails}>May 11, 2020 - 12.20</p>
              </div>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Notes</p>
                <p className={css.subdetails}>For buying some socks</p>
              </div>
            </div>
            <div
              className={css.continue1}
              onClick={() => {
                modalhandler();
                console.log("asd");
                console.log(modalOpen);
              }}
            >
              <button className={css.continue}>Continue</button>
            </div>
          </aside>
        </section>
        <Modal open={modalOpen} setOpen={setModalOpen} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
