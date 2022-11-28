import React from "react";
import Image from "next/image";
import css from "styles/CardHistory.module.css";
import sample from "src/assets/avatar.webp";

function CardHistory({ data }) {
  const link = process.env.CLOUDINARY_LINK;
  const currency = (price) => {
    const rupiah = data.type === "send" ? "-RP. " : "+Rp. ";
    return (
      rupiah +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };
  return (
    <>
      <div className={css["card"]}>
        <div className={css["image-name"]}>
          <div className={css["image-container"]}>
            <Image
              src={!data.image ? sample : `${link}/${data.image}`}
              alt="user"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <p className={css["username"]}>{data?.fullName || "dummy"}</p>
            <p className={css.status}>{data?.type || "success"}</p>
          </div>
        </div>
        <div>
          <p className={data.type === "send" ? css.paid : css.recive}>
            {currency(data?.amount)}
          </p>
        </div>
      </div>
    </>
  );
}

export default CardHistory;
