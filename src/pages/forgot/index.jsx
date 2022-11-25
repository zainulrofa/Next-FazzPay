import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "components/LayoutAuth";
import PageTitle from "components/Header";
import styles from "styles/Forgot.module.css";

export default function Forgot() {
  const [body, setBody] = useState({});
  const [emptyForm, setEmptyForm] = useState(true);
  const changeHandler = (e) =>
    setBody({ ...body, [e.target.name]: e.target.value });

  const checkEmptyForm = (body) => {
    if (!body.email) return setEmptyForm(true);
    body.email && setEmptyForm(false);
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

  return (
    <>
      <PageTitle title="Forgot Password" />

      <Layout>
        <h1 className={styles["h1"]}>
          Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password
          In a Minutes.
        </h1>
        <p className={styles["description"]}>
          To reset your password, you must type your e-mail and we will send a
          link to your email and you will be directed to the reset password
          screens.
        </p>
        <form className={styles["form"]}>
          <div className={styles["email"]}>
            <i className="bi bi-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              required
              onChange={changeHandler}
            ></input>
          </div>
          <button type="submit" disabled={emptyForm}>
            Confirm
          </button>
          <div className={styles["link-blue"]}>
            Back to{"  "}
            <Link href="/login">Login</Link>
          </div>
        </form>
      </Layout>
    </>
  );
}
