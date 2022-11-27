import React, { useEffect, useState } from "react";
import Header from "components/Navbar";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import css from "styles/EditPhone.module.css";
import { useDispatch, useSelector } from "react-redux";
import userAction from "src/redux/actions/user";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function EditPhone() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [body, setBody] = useState({});
  const [emptyForm, setEmptyForm] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

  const checkEmptyForm = (body) => {
    if (!body.noTelp) return setEmptyForm(true);
    body.noTelp && setEmptyForm(false);
  };

  const changeHandler = (e) =>
    setBody({ ...body, [e.target.name]: e.target.value });

  const editPhoneSuccess = () => {
    toast.success("Your phone number updated successfully!");
    router.push("/profile/information");
  };
  // const editPhoneError = () => {
  //   if (body.length < 12) return toast.error("harus 12 jir");
  // };

  console.log(body);

  const editPhoneHandler = (e) => {
    e.preventDefault();
    dispatch(
      userAction.editPhoneThunk(
        userData.token,
        userData.id,
        body,
        editPhoneSuccess
      )
    );
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);
  return (
    <>
      <Header />
      <main className={css["container"]}>
        <div className="container">
          <div className={`row ${css["main-content"]}`}>
            <div className="col-lg-3 col-md-4">
              <Sidebar />
            </div>
            <div className="col-lg-9 col-md-8 col-12">
              <div className={css["edit-content"]}>
                <div className={css["edit-title"]}>
                  <div className={css["title"]}>
                    <h1>Edit Phone Number</h1>
                  </div>
                  <div className={css["definition"]}>
                    <p>
                      Add at least one phone number for the transfer ID so you
                      can start transfering your money to another user.
                    </p>
                  </div>
                </div>
                <form onSubmit={editPhoneHandler}>
                  <div
                    className={
                      emptyForm
                        ? css["input"]
                        : `${css["input"]} ${css["blue"]}`
                    }
                  >
                    {emptyForm ? (
                      <i className={`fa-solid fa-phone`}></i>
                    ) : (
                      <i className={`fa-solid fa-phone ${css.blue}`}></i>
                    )}
                    <p>+62</p>
                    <input
                      type="text"
                      name="noTelp"
                      placeholder="exp:12-3456-7890"
                      required
                      onChange={changeHandler}
                    />
                  </div>
                  <div className={css["edit-btn"]}>
                    <button type="submit" disabled={emptyForm}>
                      Edit Phone Number
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default EditPhone;
