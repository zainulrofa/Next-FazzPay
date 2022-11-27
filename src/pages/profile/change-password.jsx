import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import css from "styles/Changepwd.module.css";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import Header from "components/Navbar";

function Changepassword() {
  // const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [similarity1, setSimilarity1] = useState(false);
  const [similarity2, setSimilarity2] = useState(false);
  // const [value, setValue] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

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
            <form className={css["form-password"]}>
              <div className={css["password"]}>
                <i className="bi bi-lock"></i>
                <input
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  placeholder="Enter your old password"
                  required
                  onClick={() => setSimilarity1(false)}
                ></input>
                <i
                  className={`bi ${passwordShown ? `bi-eye-slash` : `bi-eye`} 
          ${css["toggle-password"]}`}
                  onClick={togglePassword}
                ></i>
              </div>
              <div className={css["password"]}>
                <i className="bi bi-lock"></i>
                <input
                  type={passwordShown1 ? "text" : "password"}
                  name="password1"
                  placeholder="Enter your new password"
                  required
                  onClick={() => setSimilarity2(false)}
                ></input>
                <i
                  className={`bi ${passwordShown1 ? `bi-eye-slash` : `bi-eye`} 
          ${css["toggle-password"]}`}
                  onClick={togglePassword1}
                ></i>
              </div>
              <div className={css["password"]}>
                <i className="bi bi-lock"></i>
                <input
                  type={passwordShown2 ? "text" : "password"}
                  name="password2"
                  placeholder="Re-enter your password"
                  required
                  onClick={() => setSimilarity2(false)}
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
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Changepassword;
