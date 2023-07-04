import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReceivedPayments, fetchSentPayments } from "../../store/payment";

function PaymentDetailsSection({ paymentId }) {
  const dispatch = useDispatch();

  const payments = useSelector((state)=>state.payment)
//   const sentPayments = useSelector((state)=>state.payment.sentPayments)
  const allPayments ={...payments?.receivedPayments, ...payments?.sentPayments}
  const payment =allPayments[paymentId]
  console.log(payment)
  useEffect(() => {
    dispatch(fetchReceivedPayments());
    dispatch(fetchSentPayments());
  }, [dispatch]);
  return (
    <>
      <h1>PaymentDetails Section</h1>
      <section className="subheader">
        <img
          src="https://assets.splitwise.com/assets/api/payment_icon/square/large/offline.png"
          alt="dollar sighn"
        />
        <p>Payment</p>
      </section>

      <section className="main-content"></section>
    </>
  );
}

export default PaymentDetailsSection;
