import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "src/Components/LayoutAuth";
import PageTitle from "src/Components/Header";
import styles from "styles/Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authAction from "src/redux/actions/auth";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [emptyForm, setEmptyForm] = useState(true);
  // const [unouthorized, setUnouthorized] = useState(false);
  const [body, setBody] = useState({});
  const auth = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const registerSuccess = () => {
    toast.success("Congrats! Register Successfully, Please Check Your Email!");
    router.push("/login");
  };

  const registerDenied = () => {
    toast.error(`${auth.error}`);
  };

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(authAction.registerThunk(body, registerSuccess, registerDenied));
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const checkEmptyForm = (body) => {
    if (
      isLoading ||
      !body.email ||
      !body.password ||
      !body.firstName ||
      !body.lastName
    )
      return setEmptyForm(true);
    body.email &&
      body.password &&
      body.firstName &&
      body.lastName &&
      setEmptyForm(false);
  };

  const changehandler = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);
  return (
    <>
      <PageTitle title="Register" />
      <Layout>
        <h1 className={styles["h1"]}>
          Start Accessing Banking Needs With All Devices and All Platforms With
          30.000+ Users
        </h1>
        <p className={styles["description"]}>
          Transfering money is easier than ever, you can access Zwallet wherever
          you are. Desktop, laptop, mobile phone? we cover all of that for you!
        </p>
        <form className={styles["form"]} onSubmit={registerHandler}>
          <div className={styles["fname"]}>
            <i className="bi bi-person"></i>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              required
              onChange={changehandler}
            ></input>
          </div>
          <div className={styles["lname"]}>
            <i className="bi bi-person"></i>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              required
              onChange={changehandler}
            ></input>
          </div>
          <div className={styles["email"]}>
            <i className="bi bi-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              required
              onChange={changehandler}
            ></input>
          </div>
          <div className={styles["password"]}>
            <i className="bi bi-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              onChange={changehandler}
            ></input>
            <i
              className={`bi ${showPassword ? `bi-eye-slash` : `bi-eye`} 
            ${styles["toggle-password"]}`}
              onClick={togglePassword}
            ></i>
          </div>
          <button type="submit" disabled={emptyForm}>
            Register
          </button>
          <div className={styles["link-blue"]}>
            Already have an account? Let`s{"  "}
            <Link href="/login">Login</Link>
          </div>
        </form>
      </Layout>
    </>
  );
}
