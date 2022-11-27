import React, { useState } from "react";
import Image from "next/image";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import css from "styles/Transfer.module.css";
import user from "src/assets/1.png";
import user2 from "src/assets/image.png";
import search from "src/assets/search.png";
import { useRouter } from "next/router";

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
        <aside className={`${css["bottom-right"]} ${css.side}`}>
          <div className={css["right-top"]}>
            <p className={css["transaction"]}>Search Receiver</p>
          </div>
          <div className={css.searchs}>
            <Image src={search} className={css.searchImage} alt="search" />
            <input
              type="text"
              className={css.searchInput}
              placeholder="Search receiver here"
            />
          </div>
          {isData ? (
            <div>
              <div
                className={css["card"]}
                onClick={() => {
                  router.push("/ammount/:id");
                }}
              >
                <div className={css["image-name"]}>
                  <Image src={user} alt="user" width={56} height={56} />
                  <div>
                    <p className={css["username"]}>Samuel Suhi</p>
                    <p className={css.status}>+62 8139 3877 7946</p>
                  </div>
                </div>
              </div>
              <div className={css["card"]}>
                <div className={css["image-name"]}>
                  <Image src={user2} alt="user" width={56} height={56} />
                  <div>
                    <p className={css["username"]}>Samuel Suhi</p>
                    <p className={css.status}>+62 8139 3877 7946</p>
                  </div>
                </div>
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
              <div className={css["card"]}>
                <div className={css["image-name"]}>
                  <Image src={user2} alt="user" width={56} height={56} />
                  <div>
                    <p className={css["username"]}>Samuel Suhi</p>
                    <p className={css.status}>+62 8139 3877 7946</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className={css["no-data"]}>No Data Available</div>
            </div>
          )}
        </aside>
      </div>
      <Footer />
    </>
  );
}

export default Home;
