import React, { useState } from "react";
import Image from "next/image";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import css from "styles/Ammount.module.css";
import user from "src/assets/1.png";
import { useRouter } from "next/router";
import pen from "src/assets/Vector-pen.png";

function Home() {
  const router = useRouter();
  const isData = true;
  const [filter, setFilter] = useState(false);
  return (
    <>
      <Header title={"HOME"} />
      <Navbar />
      <div className={css.container}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <section className={`${css.side}`}>
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
              <div className={css.type}>
                Type the amount you want to transfer and then press continue to
                the next steps.
              </div>
            </div>
            <div className={css["input-transfer"]}>
              <input
                className={css.searchImage}
                type="text"
                placeholder="0.00"
              />
            </div>
            <div className={css.availability}>Rp120.000 Available</div>
            <div className={css["input-transfer2"]}>
              <Image className={css["image-pen"]} src={pen} />
              <input
                className={css.notes}
                type="text"
                placeholder="Add some notes"
              />
            </div>
            <div className={css.continue1}>
              <button
                className={css.continue}
                onClick={() => {
                  router.push("/confirmation/:id");
                }}
              >
                Continue
              </button>
            </div>
          </aside>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
