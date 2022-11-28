import React, { useEffect, useState } from "react";
import Header from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import css from "styles/Profile.module.css";
import Image from "next/image";

import sample from "../../assets/avatar.webp";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import authAction from "src/redux/actions/auth";
import userAction from "src/redux/actions/user";

function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const logoutMsg = useSelector((state) => state.auth.logoutMsg);
  const [openModal, setOpenModal] = useState(false);
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.user.profile);
  const link = process.env.CLOUDINARY_LINK;
  const inputFileRef = React.createRef();

  const inputImage = () => {
    inputFileRef.current.click();
  };

  const toInfo = () => {
    router.push("/profile/information");
  };

  const toChangePwd = () => {
    router.push("/profile/change-password");
  };

  const toChangePin = () => {
    router.push("/profile/change-pin");
  };

  const handleModal = () => setOpenModal(!openModal);

  const logoutHandler = () => {
    dispatch(
      authAction.logoutThunk(() => {
        toast.success(`${logoutMsg}`);
        router.push("/login");
      })
    );
  };

  const editImageHandler = (e) => {
    const body = new FormData();
    body.append("image", e.target.files[0]);

    dispatch(
      userAction.editImageThunk(auth.userData.token, auth.userData.id, body)
    );
  };

  useEffect(() => {
    dispatch(
      userAction.getUserDetailThunk(auth.userData.token, auth.userData.id)
    );
  }, [auth]);

  return (
    <>
      <Header title={"HOME"} />
      <main className={css["container"]}>
        <div className="container">
          <div className={`row ${css["main-content"]}`}>
            <div className="col-lg-3 col-md-4">
              <Sidebar />
            </div>
            <div className="col-lg-9 col-md-8 col-12">
              <div className={css["profile-content"]}>
                <div className={css["profile-detail"]}>
                  <div className={css["top-content"]}>
                    <div className={css["photo"]}>
                      <Image
                        alt="profile"
                        src={
                          !profile.image ? sample : `${link}/${profile.image}`
                        }
                        placeholder="blur"
                        blurDataURL={"./assets/avatar.jpg"}
                        onError={() => "./assets/avatar.jpg"}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <input
                      type="file"
                      name="image"
                      hidden={true}
                      ref={inputFileRef}
                      onChange={(e) => {
                        editImageHandler(e);
                      }}
                    />
                    <div className={css["name-phone"]}>
                      <div className={css["edit"]} onClick={inputImage}>
                        <i className="fa-solid fa-pen"></i>
                        <p>Edit</p>
                      </div>
                      <div className={css["name"]}>
                        <p>{`${profile.firstName} ${profile.lastName}`}</p>
                      </div>
                      <div className={css["phone"]}>
                        <p>
                          {!profile.noTelp
                            ? "+62-xx-xxxx-xxxx"
                            : `+62${profile.noTelp}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={css["profile-btn"]}>
                    <button onClick={toInfo}>
                      <p>Personal Information</p>
                      <span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </button>
                    <button onClick={toChangePwd}>
                      <p>Change Password</p>
                      <span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </button>
                    <button onClick={toChangePin}>
                      <p>Change PIN</p>
                      <span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </button>
                    <button onClick={handleModal}>Logout </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {openModal && (
        <div className={css.modal}>
          <div className={css["modal-container"]}>
            <div className={css["title-modal"]}>
              <p>Logout</p>
            </div>
            <div className={css.ask}>
              <p>Are you sure want to logout?</p>
            </div>
            <div className={css["container-btn"]}>
              <div className={`${css.btn}`} onClick={logoutHandler}>
                <p>YES</p>
              </div>
              <div className={css["btn-close"]} onClick={handleModal}>
                <p>NO</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Profile;
