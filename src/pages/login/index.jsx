import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Layout from "src/Components/LayoutAuth";
import PageTitle from "src/Components/Header";
import styles from "styles/Login.module.css";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import authAction from "src/redux/actions/auth";
import "react-toastify/dist/ReactToastify.css";
import userAction from "src/redux/actions/user";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [emptyForm, setEmptyForm] = useState(true);
  // const [unouthorized, setUnouthorized] = useState(false);
  const [body, setBody] = useState({});
  const auth = useSelector((state) => state.auth);

  const checkEmptyForm = (body) => {
    if (!body.email || !body.password) return setEmptyForm(true);
    body.email && body.password && setEmptyForm(false);
  };
  const togglePassword = () => setShowPassword(!showPassword);

  const loginSussess = () => {
    if (!auth.userData.pin)
      return toast.success(`Login Successfully! Please create your pin!`);
    if (auth.userData.pin)
      return toast.success(`Login Successfully! Welcome ${body.email}`);
  };

  const loginError = () => toast.error(`Login Failed: ${auth.error}`);

  const changeHandler = (e) =>
    setBody({ ...body, [e.target.name]: e.target.value });

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(authAction.loginThunk(body, loginSussess, loginError));
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

  useEffect(() => {
    if (auth.isLoading) setEmptyForm(true);
    if (auth.isFulfilled) {
      dispatch(
        userAction.getUserDetailThunk(auth.userData.token, auth.userData.id)
      );
      if (!auth.userData.pin) router.push("/createpin");
      if (auth.userData.pin) router.push("/dashboard");
    }
  }, [auth]);

  return (
    <>
      <PageTitle title="Login" />

      <Layout>
        <h1 className={styles["h1"]}>
          Start Accessing Banking Needs With All Devices and All Platforms With
          30.000+ Users
        </h1>
        <p className={styles["description"]}>
          Transfering money is eassier than ever, you can access Zwallet
          wherever you are. Desktop, laptop, mobile phone? we cover all of that
          for you!
        </p>
        <form onSubmit={loginHandler} className={styles["form"]}>
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
          <div className={styles["password"]}>
            <i className="bi bi-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              onChange={changeHandler}
            ></input>
            <i
              className={`bi ${showPassword ? `bi-eye-slash` : `bi-eye`} 
            ${styles["toggle-password"]}`}
              onClick={togglePassword}
            ></i>
          </div>
          <div className={styles["link-forgot"]}>
            <Link href="/reset-password" passHref>
              Forgot password?
            </Link>
          </div>
          <button type="submit" disabled={emptyForm}>
            Login
          </button>
          <div className={styles["link-blue"]}>
            Don`t have an account? Let`s{"  "}
            <Link href="/register">Register</Link>
          </div>
        </form>
      </Layout>
    </>
  );
}
