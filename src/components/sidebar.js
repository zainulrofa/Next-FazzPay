// import { Button, Modal } from "bootstrap";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authAction from "src/redux/actions/auth";
import Styles from "styles/Sidebar.module.css";
import Modal from "components/ModalTopUp";
import userAction from "src/redux/actions/user";

function Sidebar() {
  const [selectDashboard, setDashboard] = useState(false);
  const [selectTransfer, setTransfer] = useState(false);
  const [selectTopUp, setTopUp] = useState(false);
  const [selectProfile, setProfile] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const logoutMsg = useSelector((state) => state.auth.logoutMsg);
  const auth = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const handleModal = () => setOpenModal(!openModal);
  // console.log(auth);

  const logoutHandler = () => {
    dispatch(
      authAction.logoutThunk(() => {
        toast.success(`${logoutMsg}`);
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
    if (router.pathname.includes("dashboard")) return setDashboard(true);
    if (router.pathname.includes("profile")) return setProfile(true);
  }, []);

  const dashboardHandler = (e) => {
    e.preventDefault();
    setDashboard(true);
    setTransfer(false);
    setTopUp(false);
    setProfile(false);
    router.push("/dashboard");
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
    setShowModal(!showModal);
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

  useEffect(() => {
    dispatch(
      userAction.getUserDetailThunk(auth.userData.token, auth.userData.id)
    );
    if (auth.isLoading) setisLoading(true);
  }, [auth]);

  return (
    <>
      <div
        className={`${Styles["toggle"]} ${Styles["close-toggle"]}`}
        onClick={toggleHandler}
      >
        {!show ? (
          <i className="fa-solid fa-bars"></i>
        ) : (
          <i class="fa-solid fa-xmark"></i>
        )}
      </div>
      <Modal
        open={showModal}
        setOpen={setShowModal}
        token={auth.userData.token}
      />
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
            <div className={Styles.logout} onClick={handleModal}>
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
        <div className={Styles.logout} onClick={handleModal}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <p className={Styles["close"]}>Logout</p>
        </div>
      </div>
      {openModal && (
        <div className={Styles.modal}>
          <div className={Styles["modal-container"]}>
            <div className={Styles["title-modal"]}>
              <p>Logout</p>
            </div>
            <div className={Styles.ask}>
              <p>Are you sure want to logout?</p>
            </div>
            <div className={Styles["container-btn"]}>
              <div
                className={`${Styles.btn} ${
                  isLoading ? Styles.loading : undefined
                }`}
                onClick={logoutHandler}
              >
                <p>YES</p>
              </div>
              <div className={Styles["btn-close"]} onClick={handleModal}>
                <p>NO</p>
              </div>
            </div>
          </div>
        </div>
      )}
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
