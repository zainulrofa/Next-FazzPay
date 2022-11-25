// import { Button, Modal } from "bootstrap";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authAction from "src/redux/actions/auth";
import Styles from "styles/Sidebar.module.css";

function Sidebar() {
  const [selectDashboard, setDashboard] = useState(false);
  const [selectTransfer, setTransfer] = useState(false);
  const [selectTopUp, setTopUp] = useState(false);
  const [selectProfile, setProfile] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const errorMsg = useSelector((state) => state.auth.logoutMsg);
  const [show, setShow] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  // const handleModal = () => setOpenModal(!openModal);
  // console.log(auth);

  const logoutHandler = () => {
    dispatch(
      authAction.logoutThunk(() => {
        toast.success(`${errorMsg}`);
        router.push("/login");
      })
    );
  };

  useEffect(() => {
    if (
      router.pathname.includes("transfer") ||
      router.pathname.includes("ammount") ||
      router.pathname.includes("confirmation")
    )
      return setTransfer(true);
    if (router.pathname.includes("home")) return setDashboard(true);
    if (router.pathname.includes("profile")) return setProfile(true);
  }, []);

  const dashboardHandler = (e) => {
    e.preventDefault();
    setDashboard(true);
    setTransfer(false);
    setTopUp(false);
    setProfile(false);
    router.push("/home");
  };
  const transferHandler = (e) => {
    e.preventDefault();
    setDashboard(false);
    setTransfer(true);
    setTopUp(false);
    setProfile(false);
    router.push("/transfer/:username");
  };
  const topupHandler = (e) => {
    e.preventDefault();
    setDashboard(false);
    setTransfer(false);
    setTopUp(true);
    setProfile(false);
  };
  const profileHandler = (e) => {
    e.preventDefault();
    setDashboard(false);
    setTransfer(false);
    setTopUp(false);
    setProfile(true);
    router.push("/profile");
  };

  const toggleHandler = () => {
    setShow(!show);
  };

  return (
    <>
      <div
        className={`${Styles["toggle"]} ${Styles["close-toggle"]}`}
        onClick={toggleHandler}
      >
        <i className="fa-solid fa-bars"></i>
      </div>
      {show && (
        <>
          <div className={Styles["bg-modal"]}></div>
          <div className={Styles["toggle-list"]}>
            <div
              className={`${Styles.dashboard} ${
                selectDashboard ? Styles.on : undefined
              }`}
              onClick={dashboardHandler}
            >
              {selectDashboard && <div className={Styles.rectangle}></div>}
              <i
                className={`bi bi-grid ${Styles.icon} ${
                  selectDashboard ? Styles.on : Styles.off
                }`}
              ></i>
              <p
                className={`${Styles.textDasboard} onClick={() => {
                router.push("/home/:id")
              }} ${Styles.close}`}
              >
                Dashboard
              </p>
            </div>
            <div
              className={`${Styles.dashboard} ${
                selectTransfer ? Styles.on : undefined
              }`}
              onClick={transferHandler}
            >
              {selectTransfer && <div className={Styles.rectangle}></div>}
              <i
                className={`fa-solid fa-arrow-up ${Styles.icon} ${
                  selectTransfer ? Styles.on : Styles.off
                }`}
              ></i>
              <p
                className={`${Styles.textDasboard} onClick={() => {
                
              }} ${Styles.close}`}
              >
                Transfer
              </p>
            </div>
            <div
              className={`${Styles.dashboard} ${
                selectTopUp ? Styles.on : undefined
              }`}
              onClick={topupHandler}
            >
              {selectTopUp && <div className={Styles.rectangle}></div>}
              <i
                className={`fa-solid fa-plus ${Styles.icon} ${
                  selectTopUp ? Styles.on : Styles.off
                }`}
              ></i>
              <p className={`${Styles.textDasboard} ${Styles.close}`}>Top Up</p>
            </div>
            <div
              className={`${Styles.dashboard} ${
                selectProfile ? Styles.on : undefined
              }`}
              onClick={profileHandler}
            >
              {selectProfile && <div className={Styles.rectangle}></div>}
              <i
                className={`fa-regular fa-user ${Styles.icon} ${
                  selectProfile ? Styles.on : Styles.off
                }`}
              ></i>
              <p className={`${Styles.textDasboard} ${Styles.close}`}>
                Profile
              </p>
            </div>
            <div className={Styles.logout} onClick={logoutHandler}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <p className={Styles["close"]}>Logout</p>
            </div>
          </div>
        </>
      )}
      <div className={Styles["container"]}>
        <div
          className={`${Styles.dashboard} ${
            selectDashboard ? Styles.on : undefined
          }`}
          onClick={dashboardHandler}
        >
          {selectDashboard && <div className={Styles.rectangle}></div>}
          <i
            className={`bi bi-grid ${Styles.icon} ${
              selectDashboard ? Styles.on : Styles.off
            }`}
          ></i>
          <p className={`${Styles.textDasboard} ${Styles.close}`}>Dashboard</p>
        </div>
        <div
          className={`${Styles.dashboard} ${
            selectTransfer ? Styles.on : undefined
          }`}
          onClick={transferHandler}
        >
          {selectTransfer && <div className={Styles.rectangle}></div>}
          <i
            className={`fa-solid fa-arrow-up ${Styles.icon} ${
              selectTransfer ? Styles.on : Styles.off
            }`}
          ></i>
          <p className={`${Styles.textDasboard} ${Styles.close}`}>Transfer</p>
        </div>
        <div
          className={`${Styles.dashboard} ${
            selectTopUp ? Styles.on : undefined
          }`}
          onClick={topupHandler}
        >
          {selectTopUp && <div className={Styles.rectangle}></div>}
          <i
            className={`fa-solid fa-plus ${Styles.icon} ${
              selectTopUp ? Styles.on : Styles.off
            }`}
          ></i>
          <p className={`${Styles.textDasboard} ${Styles.close}`}>Top Up</p>
        </div>
        <div
          className={`${Styles.dashboard} ${
            selectProfile ? Styles.on : undefined
          }`}
          onClick={profileHandler}
        >
          {selectProfile && <div className={Styles.rectangle}></div>}
          <i
            className={`fa-regular fa-user ${Styles.icon} ${
              selectProfile ? Styles.on : Styles.off
            }`}
          ></i>
          <p className={`${Styles.textDasboard} ${Styles.close}`}>Profile</p>
        </div>
        <div className={Styles.logout} onClick={logoutHandler}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <p className={Styles["close"]}>Logout</p>
        </div>
      </div>
      {/* <Modal show={openModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Spectrum</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to logout?</Modal.Body>
        <Modal.Footer>
          <Button className={Styles["yes-btn"]} onClick={logoutHandler}>
            Yes
          </Button>
          <Button className={Styles["close-btn"]} onClick={handleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default Sidebar;
