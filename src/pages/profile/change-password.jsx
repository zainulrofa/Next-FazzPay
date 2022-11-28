import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import css from "styles/Changepwd.module.css";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import Header from "components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import userAction from "src/redux/actions/user";
import { toast } from "react-toastify";

function Changepassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [similarity1, setSimilarity1] = useState(false);
  const [similarity2, setSimilarity2] = useState(false);
  const [emptyForm, setEmptyForm] = useState(true);
  const [body, setBody] = useState({});
  const [value, setValue] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const errorMsg = useSelector((state) => state.user.msgWrongPass);

  const checkEmptyForm = (body) => {
    if (!body.oldPassword || !body.newPassword || !body.confirmPassword)
      return setEmptyForm(true);
    body.oldPassword &&
      body.newPassword &&
      body.confirmPassword &&
      setEmptyForm(false);
  };

  const changeHandler = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
    if (e.target.value) setValue(true);
    else setValue(false);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  const editPasswordSuccess = () => {
    toast.success("Congrats! your password updated successfully!");
    router.push("/profile");
  };
  // console.log(errorMsg);
  const editPassError = () => {
    toast.error(`${errorMsg}`);
  };

  const editPassword = (e) => {
    e.preventDefault();
    const body = {
      oldPassword: e.target.oldPassword.value,
      newPassword: e.target.newPassword.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    if (
      e.target.newPassword.value !== e.target.confirmPassword.value ||
      e.target.oldPassword.value === e.target.newPassword.value
    ) {
      if (e.target.newPassword.value !== e.target.confirmPassword.value)
        return setSimilarity2(true);
      if (e.target.oldPassword.value === e.target.newPassword.value)
        return setSimilarity1(true);
    }

    dispatch(
      userAction.editPasswordThunk(
        userData.token,
        userData.id,
        body,
        () => {
          toast.success("Congrats! your password updated successfully!");
          router.push("/profile");
        },
        editPassError
      )
    );
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

  console.log(body);

  return (
    <>
      <Header />
      <div className={css["main-container"]}>
        <div className="col-lg-3 col-md-4">
          <Sidebar />
        </div>
        <div className="col-lg-9 col-md-8 col-12">
          <div className={css["box-main"]}>
            <div className={css["header"]}>
              <h2 className={css["title"]}>Change Password</h2>
            </div>
            <div className={css["title-small"]}>
              <p>
                You must enter your current password and then type your new
                password twice.
              </p>
            </div>
            <form className={css["form-password"]} onSubmit={editPassword}>
              <div className={css["password"]}>
                {emptyForm ? (
                  <i className="fa-solid fa-lock"></i>
                ) : (
                  <i className={`fa-solid fa-lock ${css.blue}`}></i>
                )}
                <input
                  type={passwordShown ? "text" : "password"}
                  name="oldPassword"
                  placeholder="Enter your old password"
                  required
                  onClick={() => setSimilarity1(false)}
                  onChange={changeHandler}
                ></input>
                <i
                  className={`bi ${passwordShown ? `bi-eye-slash` : `bi-eye`} 
          ${css["toggle-password"]}`}
                  onClick={togglePassword}
                ></i>
              </div>
              <div className={css["password"]}>
                {emptyForm ? (
                  <i className="fa-solid fa-lock"></i>
                ) : (
                  <i className={`fa-solid fa-lock ${css.blue}`}></i>
                )}
                <input
                  type={passwordShown1 ? "text" : "password"}
                  name="newPassword"
                  placeholder="Enter your new password"
                  required
                  onClick={() => setSimilarity2(false)}
                  onChange={changeHandler}
                ></input>
                <i
                  className={`bi ${passwordShown1 ? `bi-eye-slash` : `bi-eye`} 
          ${css["toggle-password"]}`}
                  onClick={togglePassword1}
                ></i>
              </div>
              <div className={css["password"]}>
                {emptyForm ? (
                  <i className="fa-solid fa-lock"></i>
                ) : (
                  <i className={`fa-solid fa-lock ${css.blue}`}></i>
                )}
                <input
                  type={passwordShown2 ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  required
                  onClick={() => setSimilarity2(false)}
                  onChange={changeHandler}
                ></input>
                <i
                  className={`bi ${passwordShown2 ? `bi-eye-slash` : `bi-eye`} 
          ${css["toggle-password"]}`}
                  onClick={togglePassword2}
                ></i>
              </div>
              <p
                className={`${css["password-notif"]} ${
                  !similarity1 ? css["show"] : css["hide"]
                }`}
              >
                Your new password cannot be the same as your old password!
              </p>
              <p
                className={`${css["password-notif"]} ${
                  similarity2 ? css["hide"] : css["show"]
                }`}
              >
                Retyped password didn&apos;t match!
              </p>
              <div className={css["edit-btn"]}>
                <button type="submit" disabled={emptyForm}>
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Changepassword;
