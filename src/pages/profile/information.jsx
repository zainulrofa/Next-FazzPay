import React from "react";
import Header from "components/Navbar";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import css from "styles/ProfileInfo.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Information() {
  const router = useRouter();
  const profile = useSelector((state) => state.user.profile);

  const toEditPhone = () => {
    router.push("/profile/edit-phone");
  };
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
              <div className={css["profile-info"]}>
                <div className={css["title"]}>
                  <h1>Personal Information</h1>
                </div>
                <div className={css["definition"]}>
                  <p>
                    We got your personal information from the sign up proccess.
                    If you want to make changes on your information, contact our
                    support.
                  </p>
                </div>
                <div className={css["edit-btn"]}>
                  <p>Edit</p>
                </div>
                <form action="">
                  <div className={css["input-bar"]}>
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      value={profile.firstName}
                      placeholder="Input Here..."
                    />
                  </div>
                  <div className={css["input-bar"]}>
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      value={profile.lastName}
                      placeholder="Input Here..."
                    />
                  </div>
                  <div className={css["input-bar"]}>
                    <label htmlFor="">Verified E-mail</label>
                    <input
                      type="text"
                      value={profile.email}
                      placeholder="Input Here..."
                    />
                  </div>
                  <div className={`${css["input-bar"]} ${css["input-phone"]}`}>
                    <div className={css["left"]}>
                      <label htmlFor="">Phone Number</label>
                      <input
                        type="text"
                        value={
                          !profile.noTelp
                            ? "+62-xx-xxxx-xxxx"
                            : `+62${profile.noTelp}`
                        }
                        placeholder="Input Here..."
                      />
                    </div>
                    <div className={css["right"]}>
                      <p onClick={toEditPhone}>Manage</p>
                    </div>
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

export default Information;
