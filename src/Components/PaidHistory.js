import React from "react";
import Image from "next/image";
import css from "styles/Home.module.css";

function PaidHistory({ image, username, price }) {
  return (
    <div className={css["card"]}>
      <div className={css["image-name"]}>
        <div className={css["image-container"]}>
          <Image src={image} alt="user" layout="fill" objectFit="cover" />
        </div>
        <div>
          <p className={css["username"]}>{username}</p>
          <p className={css.status}>Transfer</p>
        </div>
      </div>
      <div>
        <p className={css.paid}>-{price}</p>
      </div>
    </div>
  );
}

export default PaidHistory;
