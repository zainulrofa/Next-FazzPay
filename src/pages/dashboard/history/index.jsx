import React, { useState, useEffect } from "react";
// import Image from "next/image";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import Loading from "components/Loading";
import css from "styles/History.module.css";
// import user from "src/assets/1.png";
// import user2 from "src/assets/image.png";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Recieve from "components/RecieveHistory";
import Paid from "components/PaidHistory";
import historyAction from "src/redux/actions/history";
import CardHistory from "components/CardHistory";

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useSelector((state) => state.history);
  const totalPage = useSelector((state) => state.history.pagination.totalPage);
  const [query, setQuery] = useState({
    page: 1,
    limit: 4,
    filter: "YEAR",
  });
  const [filter, setFilter] = useState(false);
  const [filterSelect, setfilterSelect] = useState(null);
  const [dataFound, setDataFound] = useState(false);

  const isLoading = useSelector((state) => state.history.isLoading);

  useEffect(() => {
    // router.push(`/history?page=${query.page}filter=${query.filter}`);
    dispatch(historyAction.historyThunk(auth.userData.token, query));
    if (history?.history.length > 0) setDataFound(true);
  }, [query]);

  const filterHandler = (text) => {
    setfilterSelect(text);
  };

  console.log(totalPage);
  return (
    <>
      <Header title={"HOME"} />
      <Navbar />
      <div className={css.container}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <aside className={css["bottom-right"]}>
          <div className={css["right-top"]}>
            <p className={css["transaction"]}>Transaction History</p>
            <div className={`${css.filter} ${css.filterHead}`}>
              <div
                className={css.show}
                onClick={() => {
                  setFilter(filter ? false : true);
                  console.log(filter);
                }}
              >
                {!filterSelect ? "-- Select Filter --" : filterSelect}
              </div>
              {filter && (
                <i
                  className={`fa-regular fa-x ${css["icon"]}`}
                  onClick={() => {
                    setfilterSelect(null);
                    router.push("/dashboard/history");
                  }}
                ></i>
              )}
              <div className={filter ? css.filterDownOn : css.filterDownOff}>
                <p
                  className={filter ? css.filterDownOn2 : css.filterDownOff}
                  onClick={() => {
                    filterHandler("WEEK");
                    setFilter(false);
                    router.push("/dashboard/history?filter=WEEK");
                  }}
                >
                  WEEK
                </p>
                <p
                  className={filter ? css.filterDownOn2 : css.filterDownOff}
                  onClick={() => {
                    filterHandler("MONTH");
                    setFilter(false);
                    router.push("/dashboard/history?filter=MONTH");
                  }}
                >
                  MONTH
                </p>
                <p
                  className={filter ? css.filterDownOn2 : css.filterDownOff}
                  onClick={() => {
                    filterHandler("YEAR");
                    setFilter(false);
                    router.push("/dashboard/history?filter=YEAR");
                  }}
                >
                  YEAR
                </p>
              </div>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : dataFound ? (
            history.history.map((data, index) => {
              return <CardHistory data={data} key={index} />;
            })
          ) : (
            <div>
              <div className={css["no-data"]}>No Data Available</div>
            </div>
          )}
          <div className={css["btn-container"]}>
            <button
              disabled={query.page === 1 ? true : false}
              onClick={() => {
                setQuery({ ...query, page: query.page - 1 });
              }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              disabled={query.page === totalPage ? true : false}
              onClick={() => {
                setQuery({ ...query, page: query.page + 1 });
              }}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  );
}

export default Home;
