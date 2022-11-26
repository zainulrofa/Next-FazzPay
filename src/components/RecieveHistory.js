import React from "react";
import Image from "next/image";
import css from "styles/Home.module.css";

function ReciveHistory({ image, username, price, type }) {
  return (
    <>
      <div className={css["card"]}>
        <div className={css["image-name"]}>
          <div className={css["image-container"]}>
            <Image src={image} alt="user" layout="fill" objectFit="cover" />
          </div>
          <div>
            <p className={css["username"]}>{username}</p>
            {type === "accept" ? (
              <p className={css.status}>Accept</p>
            ) : (
              <p className={css.status}>Top-Up</p>
            )}
          </div>
        </div>
        <div>
          <p className={css.recive}>+{price}</p>
        </div>
      </div>
    </>
  );
}

export default ReciveHistory;
