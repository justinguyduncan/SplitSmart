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
  const handleCommentCreate = (e) => {
    e.preventDefault();
    alert("feature is coming");
  };

  return (
    <div className="comments-wrapper">
      <section className="subheader">
        <div className="image-wrapper">
          <img
            src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
            alt="reciept sign"
          />
        </div>
        <div className="subheader-text-wrapper">
          <p className="subheader-description">{expense?.description}</p>
          <p className="subheader-amount">${+expense?.amount}.00</p>
          <p className="subheader-date">
            Added by {expense?.user?.short_name} on {createdDate}
          </p>

          <button
            className="btn edit-btn"
            onClick={() => alert("feature coming soon")}
          >
            Edit expense
          </button>
        </div>
      </section>
      <hr />

      <main className="main">
        <section className="main-content">
          <div className="main-content-wrapper content-wrapper">
            <img
              src={expense?.user?.image_url}
              alt={expense?.user?.short_name}
            />
            <p>
              {expense?.user?.short_name} paid
              <span> ${+expense?.amount}.00</span> and owes <br /> $
              {+expense?.amount / (participants.length + 1)}.00
            </p>
          </div>
          <div className="main-content-wrapper">
            <ul className="main-list">
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
          </div>
        </section>
        <section className="main-content comment">
          <p className="comment-text">
            <img
              className="icon"
              src="https://res.cloudinary.com/dr1ekjmf4/image/upload/v1688652280/icons8-comment-50_eh2i18.png"
              alt="comment icon"
            />
            Notes and Comments
          </p>
          <ul className="comment">
            {expense?.comments?.map((comment) => (
              <li key={comment.id} className="comment-item">
                <p className="comment-title">
                  {comment?.user?.short_name}
                  {new Date().getMonth() ===
                    new Date(comment?.created_at).getMonth() &&
                  new Date().getDate() ===
                    new Date(comment?.created_at).getDate() ? (
                    <span className="comment-span">Today</span>
                  ) : (
                    <span className="comment-span">
                      {" "}
                      {month[new Date(comment?.created_at).getMonth()]}
                      {new Date(comment?.created_at).getDate()}
                    </span>
                  )}
                </p>
                <div className="icon-wrapper">
                  <span onClick={() => alert("feature coming soon")}>
                    <img
                      src="https://res.cloudinary.com/dr1ekjmf4/image/upload/v1688651618/icons8-pencil-50_1_cg3jui.png"
                      alt="edit icon"
                    />
                  </span>
                  <span
                    className="close"
                    onClick={() => alert("feature coming soon")}
                  >
                    X
                  </span>
                </div>
                <p className="comment-text">{comment?.comment}</p>
              </li>
            ))}
          </ul>
          <form className="comment-form" onSubmit={handleCommentCreate}>
            <label>
              <textarea placeholder="Add comment"></textarea>
            </label>
            <button className="btn post-btn" type="submit">
              Post
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default ExpenseDetailsSection;
