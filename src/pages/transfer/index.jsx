import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "src/pages/Components/Header";
import Navbar from "src/pages/Components/Navbar";
import Sidebar from "src/pages/Components/Sidebar";
import Footer from "src/pages/Components/Footer";
import Card from "src/pages/Components/CardUser";
import css from "styles/Transfer.module.css";
// import user from "src/assets/1.png";
// import user2 from "src/assets/image.png";
import search from "src/assets/search.png";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "src/modules/api/transfer";
import transferAction from "src/redux/actions/transfer";

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const token = useSelector((state) => state.auth.userData.token);
  let page = parseInt(router.query.page) || 1;

  console.log(userData);

  useEffect(() => {
    router.query.q
      ? getAllUser(token, page, router.query.q)
          .then((res) => {
            setUserData(res.data.data);

            setPaginationData(res.data.pagination);
          })
          .catch((err) => console.log(err))
      : getAllUser(token, page)
          .then((res) => {
            setUserData(res.data.data);
            setPaginationData(res.data.pagination);
          })
          .catch((err) => console.log(err));
    // dispatch(transferAction.transferReset());
  }, [router.query]);

  return (
    <>
      <Header title={"Transfer"} />
      <Navbar />
      <div className={css.container}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <aside className={`${css["bottom-right"]} ${css.side}`}>
          <div className={css["right-top"]}>
            <p className={css["transaction"]}>Search Receiver</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/transfer?q=${e.target.q.value}`);
            }}
          >
            <div className={css.searchs}>
              <Image src={search} className={css.searchImage} alt="search" />
              <input
                type="text"
                name="q"
                defaultValue={router.query.q || null}
                className={css.searchInput}
                placeholder="Search receiver here"
              />
            </div>
          </form>
          {userData ? (
            userData.map((data, index) => {
              return <Card data={data} key={index} />;
            })
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
