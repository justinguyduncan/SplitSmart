import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReceivedPayments, fetchSentPayments } from "../../store/payment";
import { fetchFriendshipById } from "../../store/friend";
import "./PaymentDetailsSection.css";

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function PaymentDetailsSection({ paymentId }) {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payment);
  const allPayments = {
    ...payments?.receivedPayments,
    ...payments?.sentPayments,
  };
  const payment = allPayments[paymentId];
  const date = new Date(payment?.created_at);
  const createdDate = `${
    month[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} `;
  const selectedFriendship = useSelector(
    (state) => state.friend?.selectedFriendship
  );
  const user = selectedFriendship?.user;
  const friend = selectedFriendship?.friend;

  useEffect(() => {
    dispatch(fetchReceivedPayments());
    dispatch(fetchSentPayments());
  }, [dispatch]);

  useEffect(() => {
    if (payment?.friendship_id) {
      dispatch(fetchFriendshipById(payment?.friendship_id));
    }
  }, [dispatch, payment?.friendship_id]);
  return (
    <>
      <h1>PaymentDetails Section</h1>
      <section className="subheader">
        <div className="image-wrapper">
          <img
            src="https://assets.splitwise.com/assets/api/payment_icon/square/large/offline.png"
            alt="dollar sign"
          />
        </div>

        <p>Payment</p>
        <p>${+payment?.amount}.00</p>
        <p>
          Added by {selectedFriendship?.user?.short_name} on {createdDate}
        </p>

        <button
          className="edit-btn"
          onClick={() => alert("feature coming soon")}
        >
          Edit payment
        </button>
      </section>
      <hr />

      <section className="main-content">
        <div className="main-content-wrapper">
          <img src={friend?.image_url} alt={friend?.short_name} />
          <p>
            {friend?.short_name} paid ${+payment?.amount}.00
          </p>
        </div>

        <div className="main-content-wrapper">
          <img src={user?.image_url} alt={user?.short_name} />
          <p>
            {user?.short_name} recieved ${+payment?.amount}.00
          </p>
        </div>
      </section>
    </>
  );
}

export default PaymentDetailsSection;
