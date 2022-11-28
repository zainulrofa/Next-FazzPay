import React from "react";
import css from "styles/Footer.module.css";

function Footer() {
  return (
    <>
      <div className={css.footer}>
        <div className={css["footer-left"]}>
          <p>2020 FazzPay. All right reserved.</p>
        </div>
        <div className={css["footer-right"]}>
          <p>+62 5637 8882 9901</p>
          <p>contact@fazzpay.com</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
