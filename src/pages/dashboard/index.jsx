import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import CardHistory from "components/CardHistory";
import css from "styles/Home.module.css";
// import user from "src/assets/1.png";
// import user2 from "src/assets/image.png";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import historyAction from "src/redux/actions/history";

function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const profile = useSelector((state) => state.user.profile);
  const auth = useSelector((state) => state.auth);
  const history = useSelector((state) => state.history);
  const [query, setQuery] = useState({ page: 1, limit: 10, filter: "WEEK" });

  const currency = (price) => {
    return (
      "Rp " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };
  useEffect(() => {
    dispatch(historyAction.historyThunk(auth.userData.token, query));
  }, [query]);

  console.log(history);
  return (
    <>
      <Header title={"HOME"} />
      <Navbar history={history?.history}>
        <div className={css.container}>
          <div className={`col-lg-3 col-md-3 ${css.onMobile}`}>
            <Sidebar />
          </div>
          <div className="col-lg-9 col-md-9">
            <aside className={css.side}>
              <div className={css["side-top"]}>
                <div className={css["top-left"]}>
                  <p className={css.balance}>Balance</p>
                  <p className={css.price}>{currency(profile.balance)}</p>
                  <p className={css.phone}>{`+62${profile.noTelp}`}</p>
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
                        router.push("/dashboard/history");
                      }}
                    >
                      See all
                    </p>
                  </div>
                  {/* {history?.history?.map((data, index) => {
                    return <CardHistory data={data} key={index} />;
                  })} */}
                  {history?.history.length < 1 ? (
                    <p>There`s not transaction yet</p>
                  ) : (
                    history?.history?.map((data, index) => {
                      if (index < 4)
                        return <CardHistory data={data} key={index} />;
                    })
                  )}
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
