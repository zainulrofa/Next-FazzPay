import React from "react";
import Image from "next/image";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import css from "styles/Home.module.css";
import user from "src/assets/1.png";
import user2 from "src/assets/image.png";
import { useRouter } from "next/router";

function Home({ children }) {
  const router = useRouter();
  return (
    <>
      <Header title={"HOME"} />
      <Navbar>
        <div className={css.container}>
          <div className={`col-lg-3 ${css.onMobile}`}>
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <aside className={css.side}>
              <div className={css["side-top"]}>
                <div className={css["top-left"]}>
                  <p className={css.balance}>Balance</p>
                  <p className={css.price}>Rp120.000</p>
                  <p className={css.phone}>+62 813-9387-7946</p>
                </div>
                <div className={`${css["top-btn"]} ${css.btnHide}`}>
                  <div className={css.btn}>
                    <i className="fa-sharp fa-solid fa-arrow-up"></i>
                    <p>Transfer</p>
                  </div>
                  <div className={css.btn}>
                    <i className="fa-solid fa-plus"></i>
                    <p>Top Up</p>
                  </div>
                </div>
              </div>
              <div className={`${css["top-btn"]} ${css.hide}`}>
                <div className={css.btn}>
                  <i className="fa-sharp fa-solid fa-arrow-up"></i>
                  <p>Transfer</p>
                </div>
                <div className={css.btn}>
                  <i className="fa-solid fa-plus"></i>
                  <p>Top Up</p>
                </div>
              </div>
              <div className={css["bottom"]}>
                <aside className={css["right-side"]}>
                  <div className={css["left-top"]}>
                    <div>
                      <i
                        className="fa-solid fa-arrow-down"
                        style={{
                          color: "#1EC15F",
                          fontSize: "30px",
                          marginBottom: "0.5rem",
                        }}
                      ></i>
                      <p style={{ color: "#6A6A6A" }}>Income</p>
                      <p
                        style={{
                          fontWeight: "700",
                          fontSize: "18px",
                          marginTop: "0.5rem",
                        }}
                      >
                        Rp2.120.000
                      </p>
                    </div>
                    <div>
                      <i
                        className="fa-solid fa-arrow-up"
                        style={{
                          color: "#FF5B37",
                          fontSize: "30px",
                          marginBottom: "0.5rem",
                        }}
                      ></i>
                      <p style={{ color: "#6A6A6A" }}>Expense</p>
                      <p
                        style={{
                          fontWeight: "700",
                          fontSize: "18px",
                          marginTop: "0.5rem",
                        }}
                      >
                        Rp1.560.000
                      </p>
                    </div>
                  </div>
                  <div className={css["left-middle"]}>
                    <p className={css["plus"]}>+Rp65.000</p>
                    <div className={css["static"]}>
                      <div className={css.sat}></div>
                      <p>Sat</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.sun}></div>
                      <p>Sun</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.mon}></div>
                      <p>Mon</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.tue}>
                        <div className={css.circle}></div>
                        <div className={css["circle-blue"]}></div>
                      </div>
                      <p>Tue</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.wed}></div>
                      <p>Wed</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.thu}></div>
                      <p>Thu</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.fri}></div>
                      <p>Fri</p>
                    </div>
                  </div>
                </aside>
                <div className={css["bottom-right"]}>
                  <div className={css["right-top"]}>
                    <p className={css["transaction"]}>Transaction History</p>
                    <p
                      className={css["seall"]}
                      onClick={() => {
                        router.push("/history/:id");
                      }}
                    >
                      See all
                    </p>
                  </div>
                  <div className={css["card"]}>
                    <div className={css["image-name"]}>
                      <Image src={user} alt="user" width={56} height={56} />
                      <div>
                        <p className={css["username"]}>Samuel Suhi</p>
                        <p className={css.status}>Accept</p>
                      </div>
                    </div>
                    <div>
                      <p className={css.recive}>+Rp50.000</p>
                    </div>
                  </div>
                  <div className={css["card"]}>
                    <div className={css["image-name"]}>
                      <Image src={user2} alt="user" width={56} height={56} />
                      <div>
                        <p className={css["username"]}>Samuel Suhi</p>
                        <p className={css.status}>Transfer</p>
                      </div>
                    </div>
                    <div>
                      <p className={css.paid}>-Rp149.000</p>
                    </div>
                  </div>
                  <div className={css["card"]}>
                    <div className={css["image-name"]}>
                      <Image src={user} alt="user" width={56} height={56} />
                      <div>
                        <p className={css["username"]}>Samuel Suhi</p>
                        <p className={css.status}>Accept</p>
                      </div>
                    </div>
                    <div>
                      <p className={css.recive}>+Rp50.000</p>
                    </div>
                  </div>
                  <div className={css["card"]}>
                    <div className={css["image-name"]}>
                      <Image src={user2} alt="user" width={56} height={56} />
                      <div>
                        <p className={css["username"]}>Samuel Suhi</p>
                        <p className={css.status}>Transfer</p>
                      </div>
                    </div>
                    <div>
                      <p className={css.paid}>-Rp149.000</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
        <Footer />
      </Navbar>
    </>
  );
}

export default Home;
