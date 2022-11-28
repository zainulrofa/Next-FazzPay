import { useRouter } from "next/router";
import React, { Children, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "src/pages/Components/PageTitle";
import { getDetailUser } from "src/modules/api/User";
import css from "styles/Amount.module.css";
import Navbar from "src/pages/Components/Navbar";
import Sidebar from "src/pages/Components/Sidebar";
import Footer from "src/pages/Components/Footer";
import Image from "next/image";
import defaultImg from "src/assets/avatar.webp";
import { currency } from "src/modules/helpers/currency";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import transferAction from "src/redux/actions/transfer";

function Amount() {
  const router = useRouter();
  const dispatch = useDispatch();
  const receiverId = router.query.receiver;
  const token = useSelector((state) => state.auth.userData.token);
  const userBalance = useSelector((state) => state.user.profile.balance);
  const [amount, setAmount] = useState(null);
  const [notes, setNotes] = useState("");
  const [receiverData, setReceiverData] = useState({});
  const link = process.env.CLOUDINARY_LINK;

  useEffect(() => {
    getDetailUser(token, receiverId)
      .then((res) => {
        setReceiverData({ ...res.data.data });
      })
      .catch((err) => console.log(err));
  }, [token, receiverId]);
  console.log(receiverData);
  const amountHandler = (e) => setAmount(e.target.value);
  const notesHandler = (e) => setNotes(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!amount)
      return toast.error("Input the amount of money you want to transfer");
    if (parseInt(amount) > userBalance)
      return toast.error("insufficient balance");
    if (amount < 1000)
      return toast.error(
        "insufficient amount, only more than Rp. 1000 are allowed"
      );
    const date = new Date();
    const body = {
      receiverId: receiverId,
      amount: parseInt(amount),
      date,
      notes,
      receiverData,
    };
    console.log(body, "INII");
    dispatch(transferAction.transferData(body));
    router.push("/transfer/confirmation");
  };

  return (
    <>
      <PageTitle title="Transfer Amount" />
      <Navbar />
      <div className={css.container}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <section className={`${css.side}`}>
          <aside className={css["bottom-right"]}>
            <div className={css["right-top"]}>
              <p className={css["transaction"]}>Transfer To</p>
            </div>
            <div className={css["card"]}>
              <div className={css["image-name"]}>
                <Image
                  src={`${link}/${receiverData.image}` || defaultImg}
                  alt="user"
                  width={56}
                  height={56}
                  style={{ borderRadius: "10px" }}
                />

                <div>
                  <p
                    className={css["username"]}
                  >{`${receiverData.firstName} ${receiverData.lastName}`}</p>
                  {receiverData && (
                    <p className={css.status}>{`${receiverData.noTelp}`}</p>
                  )}
                </div>
              </div>
            </div>
            <div className={css["right-top2"]}>
              <div className={css.type}>
                Type the amount you want to transfer and then press continue to
                the next steps.
              </div>
            </div>
            <div className={css["input-transfer"]}>
              <input
                className={css.searchImage}
                type="text"
                placeholder="0.00"
                onChange={amountHandler}
              />
            </div>
            <div className={css.availability}>{`Rp . ${currency(
              userBalance
            )} Available`}</div>
            <div className={css["input-notes"]}>
              <div className={`${css["input-transfer2"]} ${css.on}`}>
                <i className="bi bi-pencil"></i>
                <input
                  className={css.notes}
                  type="text"
                  placeholder="Add some notes"
                  onChange={notesHandler}
                />
              </div>
            </div>
            <div className={css.continue1}>
              <button className={css.continue} onClick={submitHandler}>
                Continue
              </button>
            </div>
          </aside>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Amount;
