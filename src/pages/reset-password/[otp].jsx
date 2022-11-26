import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "components/LayoutAuth";
import PageTitle from "components/Header";
import styles from "styles/ResetPassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authAction from "src/redux/actions/auth";

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notSimiliar, setNotSimilar] = useState(false);
  const [emptyForm, setEmptyForm] = useState(true);
  const [body, setBody] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);

  const toogleNewPassowrd = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  console.log(auth.msg);

  const changeHandler = (e) =>
    setBody({
      ...body,
      [e.target.name]: e.target.value,
      keysChangePassword: router.query.otp,
    });

  const checkEmptyForm = (body) => {
    if (!body.newPassword || !body.confirmPassword) return setEmptyForm(true);
    body.newPassword && body.confirmPassword && setEmptyForm(false);
  };

  const resetSuccess = () => {
    toast.success(`${auth.msg}`);
    // router.push("/login");
  };

  const resetDenied = () => {
    toast.error(`${auth.error}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (body.newPassword !== body.confirmPassword) return setNotSimilar(true);
    dispatch(authAction.resetThunk(body, resetSuccess, resetDenied));
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

  useEffect(() => {
    if (auth.isLoading) setEmptyForm(true);
  }, [auth]);
  console.log(router.query.otp);
  return (
    <>
      <PageTitle title="Reset Password" />

      <Layout>
        <h1 className={styles["h1"]}>
          Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password
          In a Minutes.
        </h1>
        <p className={styles["description"]}>
          Now you can create a new password for your FazzPay account. Type your
          password twice so we can confirm your new passsword.
        </p>
        <form onSubmit={submitHandler} className={styles["form"]}>
          <div className={styles["password"]}>
            <i className="bi bi-lock"></i>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Enter your new password"
              required
              onChange={changeHandler}
              onClick={() => setNotSimilar(false)}
            ></input>
            <i
              className={`bi ${showNewPassword ? `bi-eye-slash` : `bi-eye`} 
        ${styles["toggle-password"]}`}
              onClick={toogleNewPassowrd}
            ></i>
          </div>
          <div className={styles["password"]}>
            <i className="bi bi-lock"></i>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter your password"
              required
              onChange={changeHandler}
              onClick={() => setNotSimilar(false)}
            ></input>
            <i
              className={`bi ${showConfirmPassword ? `bi-eye-slash` : `bi-eye`} 
        ${styles["toggle-password"]}`}
              onClick={toggleConfirmPassword}
            ></i>
          </div>
          <p
            className={`${styles["password-notif"]} ${
              notSimiliar ? styles["show"] : styles["hide"]
            }`}
          >
            Retyped password didn&apos;t match!
          </p>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={emptyForm}
          >
            Submit
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
