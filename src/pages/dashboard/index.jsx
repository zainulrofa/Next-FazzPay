import React, { useEffect, useState } from "react";
import { currency as currencyComma } from "src/modules/helpers/currency";
import Image from "next/image";
import Header from "src/Components/Header";
import Navbar from "src/Components/Navbar";
import Sidebar from "src/Components/Sidebar";
import Footer from "src/Components/Footer";
import Loading from "src/Components/Loading";
import Modal from "src/Components/ModalTopUp";
import CardHistory from "src/Components/CardHistory";
import css from "styles/Home.module.css";
// import user from "src/assets/1.png";
// import user2 from "src/assets/image.png";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import historyAction from "src/redux/actions/history";
import userAction from "src/redux/actions/user";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import dashboardAction from "src/redux/actions/dashboard";

function Home() {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  const dispatch = useDispatch();
  const router = useRouter();
  const profile = useSelector((state) => state.user.profile);
  const auth = useSelector((state) => state.auth);
  const history = useSelector((state) => state.history);
  const isLoading = useSelector((state) => state.history.isLoading);
  const statistic = useSelector((state) => state.dashboard.data);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState({ page: 1, limit: 10, filter: "WEEK" });

  const modalHandler = () => setShowModal(!showModal);

  const currency = (price) => {
    return (
      "Rp " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };
  useEffect(() => {
    dispatch(
      userAction.getUserDetailThunk(auth.userData.token, auth.userData.id)
    );
    dispatch(historyAction.historyThunk(auth.userData.token, query));
    dispatch(
      dashboardAction.statisticThunk(auth.userData.token, auth.userData.id)
    );
  }, []);

  const incomeData = {
    label: "Income",
    data: statistic.listIncome
      ? [
          statistic.listIncome[5].total,
          statistic.listIncome[6].total,
          statistic.listIncome[0].total,
          statistic.listIncome[1].total,
          statistic.listIncome[2].total,
          statistic.listIncome[3].total,
          statistic.listIncome[4].total,
        ]
      : [],
    backgroundColor: "#6379F4",
  };

  const expenseData = {
    label: "Expense",
    data: statistic.listExpense
      ? [
          statistic.listExpense[5].total,
          statistic.listExpense[6].total,
          statistic.listExpense[0].total,
          statistic.listExpense[1].total,
          statistic.listExpense[2].total,
          statistic.listExpense[3].total,
          statistic.listExpense[4].total,
        ]
      : [],
    backgroundColor: "#9DA6B5",
  };

  const data = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [incomeData, expenseData],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    legend: {
      label: {
        fontSize: 14,
        fontFamily: "Nunito Sans",
      },
    },
  };
  console.log(expenseData);

  // console.log(history);
  return (
    <>
      <Header title={"Dashboard"} />
      <Modal
        open={showModal}
        setOpen={setShowModal}
        token={auth.userData.token}
      />
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
                  <div className={css.btn} onClick={modalHandler}>
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
                <div className={css.btn} onClick={modalHandler}>
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
                        {`Rp. ${currencyComma(statistic.totalIncome)}`}
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
                        {`Rp. ${currencyComma(statistic.totalExpense)}`}
                      </p>
                    </div>
                  </div>
                  {/* <div className={css["left-middle"]}>
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
                  </div> */}
                  <Bar
                    data={data}
                    options={chartOptions}
                    className={css["bar"]}
                  />
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
                  {isLoading ? (
                    <Loading />
                  ) : history?.history.length < 1 ? (
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
