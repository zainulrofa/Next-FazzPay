import Image from "next/image";
import React from "react";
import styles from "styles/CardHistory.module.css";
import defaultImg from "../assets/avatar.webp";
import Link from "next/link";

function Card({ data }) {
  const link = process.env.CLOUDINARY_LINK;

  return (
    <Link
      href={`/transfer/amount?receiver=${data.id}`}
      //   href={`/transfer/ammount/${data.id}`}
      passHref
      style={{ textDecoration: "none" }}
    >
      <div className={styles["card"]}>
        <div className={styles["image-name"]}>
          <div className={styles["image-container"]}>
            <Image
              src={!data.image ? defaultImg : `${link}/${data.image}`}
              alt="user"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <p className={styles["username"]}>
              {`${data?.firstName} ${data?.lastName}`}
            </p>
            <p className={styles["no-telp"]}>
              {data.noTelp
                ? `+62${data.noTelp.slice(2)}`
                : "Phone number not available"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
