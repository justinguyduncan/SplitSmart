import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ExpenseDetailsSection.css";
import { getCurrentExpense } from "../../store/expense";

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
function ExpenseDetailsSection({ expenseId }) {
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expense?.currentExpense);
  const date = new Date(expense?.created_at);
  const createdDate = `${
    month[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} `;
  const participants = expense?.particpants || [];
  useEffect(() => {
    dispatch(getCurrentExpense(expenseId));
  }, [dispatch, expenseId]);

  return (
    <>
      <h1>ExpenseDetails Section</h1>
      <section className="subheader">
        <div className="image-wrapper">
          <img
            src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
            alt="reciept sign"
          />
        </div>

        <p>{expense?.description}</p>
        <p>${+expense?.amount}.00</p>
        <p>
          Added by {expense?.user?.short_name} on {createdDate}
        </p>

        <button
          className="edit-btn"
          onClick={() => alert("feature coming soon")}
        >
          Edit expense
        </button>
      </section>
      <hr />

      <section className="main-content">
        <div className="main-content-wrapper">
          <img src={expense?.user?.image_url} alt={expense?.user?.short_name} />
          <p>
            {expense?.user?.short_name} paid ${+expense?.amount}.00 and owes $
            {+expense?.amount / (participants.length + 1)}.00
          </p>
        </div>
        <ul className="main-content-wrapper">
          {participants.map((participant) => (
            <li key={participant?.id}>
              <img
                src={participant?.friendship?.friend?.image_url}
                alt={participant?.friendship?.friend?.short_name}
              />
              <p>
                {participant?.friendship?.friend?.short_name} owes $
                {+participant?.amount_due}.00
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="comment">
        <ul>
          {expense?.comments?.map((comment) => (
            <li key={comment.id}>
              <p>
                <img
                  className="icon"
                  src="https://res.cloudinary.com/dr1ekjmf4/image/upload/v1688652280/icons8-comment-50_eh2i18.png"
                  alt="comment icon"
                />{" "}
                Notes and Comments
              </p>

              <p>
                {comment?.user?.short_name}{" "}
                {month[new Date(comment?.created_at).getMonth()]}{" "}
                {new Date(comment?.created_at).getDate()}
              </p>
              <span onClick={() => alert("feature coming soon")}>
                <img
                  className="icon"
                  src="https://res.cloudinary.com/dr1ekjmf4/image/upload/v1688651618/icons8-pencil-50_1_cg3jui.png"
                  alt="edit icon"
                />{" "}
              </span>
              <span onClick={() => alert("feature coming soon")}>X</span>

              <p>{comment?.comment}</p>
            </li>
          ))}
        </ul>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("feature coming");
          }}
        >
          <textarea placeholder="Add comment"></textarea>
          <button type="submit">Post</button>
        </form>
      </section>
    </>
  );
}

export default ExpenseDetailsSection;
