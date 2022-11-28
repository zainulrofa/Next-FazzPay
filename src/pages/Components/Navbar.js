import React, { useState } from "react";
import Image from "next/image";
import sample from "src/assets/avatar.webp";
import css from "src/styles/Navbar.module.css";
import Sidebar from "src/pages/Components/Sidebar";
import { useSelector } from "react-redux";

function Navbar({ children, history }) {
  const [show, setShow] = useState(false);
  const profile = useSelector((state) => state.user.profile);
  const link = process.env.CLOUDINARY_LINK;
  const received = `${css["green"]} fa-solid fa-arrow-down`;
  const sent = `${css["red"]} fa-solid fa-arrow-up`;

  const currency = (price) => {
    return (
      "Rp. " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };

  const notifHandler = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  const sidebarHandler = (e) => {
    e.preventDefault();
    show === true && setShow(false);
  };

  return (
    <>
      <div className={css["navbar"]}>
        <div className={css["navbar-left"]}>
          <div className={css["on-mobile"]} onClick={sidebarHandler}>
            <Sidebar />
          </div>
          <p className={css.title}>FazzPay</p>
        </div>
        <div className={css["navbar-right"]}>
          <div className={css["mobile"]}>
            <div className={css["image-container"]}>
              <Image
                src={!profile.image ? sample : `${link}/${profile.image}`}
                alt="profile"
                style={{ cursor: "pointer" }}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={css["name-phone"]}>
              <p className={css["greating"]}>Hello,</p>
              <p
                className={css["navbar-name"]}
              >{`${profile.firstName} ${profile.lastName}`}</p>
              {/* <p className={css["navbar-phone"]}>+62 8139 3877 7946</p> */}
            </div>
          </div>
          <div className={css["pc"]}>
            <div className={css["image-container"]}>
              <Image
                src={!profile.image ? sample : `${link}/${profile.image}`}
                alt="profile"
                style={{ cursor: "pointer" }}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={css["name-phone"]}>
              <p
                className={css["navbar-name"]}
              >{`${profile.firstName} ${profile.lastName}`}</p>
              <p className={css["navbar-phone"]}>
                {!profile.noTelp ? "+62-xx-xxxx-xxxx" : `+62${profile.noTelp}`}
              </p>
            </div>
          </div>
          <div
            className={css["bell-notif"]}
            onClick={notifHandler}
            style={{
              fontSize: "1.6rem",
              color: "#4D4B57",
              marginLeft: "1rem",
              cursor: "pointer",
            }}
          >
            {!show ? (
              <i className="fa-regular fa-bell"></i>
            ) : (
              <i class="fa-solid fa-bell" style={{ color: "#6379F4" }}></i>
            )}
          </div>
        </div>
      </div>
      {show && (
        <>
          <div className={css.modal}>
            {history?.length < 1 ? (
              <p>No transaction yet</p>
            ) : (
              history?.map((data) => {
                return (
                  <>
                    <div className={css.card}>
                      <i className={data.type === "send" ? sent : received}></i>
                      <div>
                        <p className={css["name"]}>
                          {data.type === "send"
                            ? `Transfer to ${data.fullName}`
                            : data.type === "topup"
                            ? `Top up`
                            : `Accept from ${data.fullName}`}
                        </p>
                        <p className={css["price"]}>{currency(data.amount)}</p>
                      </div>
                    </div>
                  </>
                );
              })
            )}
          </div>
        </>
      )}
      {children}
    </>
  );
}

export default Navbar;
