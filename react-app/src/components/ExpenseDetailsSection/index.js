import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ExpenseDetailsSection.css";
import { getCurrentExpense } from "../../store/expense";
import {
  addComment,
  deleteComment,
  getCommentsByExpenseId,
} from "../../store/comment";

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
  const [comment, setComment] = useState("");
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const expense = useSelector((state) => state.expense?.currentExpense);
  const comments = useSelector((state) =>
    Object.values(state.comment?.comments)
  );

  const date = new Date(expense?.created_at);
  const createdDate = `${
    month[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} `;
  const participants = expense?.particpants || [];
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getCurrentExpense(expenseId));
      dispatch(getCommentsByExpenseId(expenseId));
    };
    fetchData();
  }, [dispatch, expenseId]);
  useEffect(() => {
    const error = {};
    if (comment.length < 1) {
      error.message = "comment to short";
    }
    if (comment.length > 255) {
      error.message = "comment to long";
    }

    setError(error);
  }, [comment]);
  const handleCommentCreate = (e) => {
    e.preventDefault();
    dispatch(addComment(comment, expenseId));
    setComment("");
  };

  const handleDelete = (commentId) => {
    let answer = window.confirm(
      "Are you sure you want to delete this comment? This will completely remove this comment for ALL people involved, not just you."
    );
    if (answer) {
      dispatch(deleteComment(commentId));
    }
  };


  const formatMoney = (amount) => {
    return (
      "$" +
      String(
        Number(amount)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      )
    );
  };

  return (
    <div className="expense-comments-wrapper">
      <section className="expense-subheader">
        <div className="expense-image-wrapper">
          <img
            src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
            alt="reciept sign"
          />
        </div>
        <div className="expense-subheader-text-wrapper">
          <p className="expense-subheader-description">
            {expense?.description}
          </p>
          <p className="expense-subheader-amount">{formatMoney(expense?.amount)}</p>
          <p className="expense-subheader-date">
            Added by {expense?.user?.short_name} on {createdDate}
          </p>

          <button
            className="expense-btn expense-edit-btn"
            onClick={() => alert("feature coming soon")}
          >
            Edit expense
          </button>
        </div>
      </section>
      <hr />

      <main className="expense-main">
        <section className="expense-main-content">
          <div className="expense-main-content-wrapper expense-content-wrapper">
            <img
              src={expense?.user?.image_url}
              alt={expense?.user?.short_name}
            />
            <p>
              {expense?.user?.short_name} paid{" "}
              <span> {formatMoney(expense?.amount)}</span> and owes {" "}
              {formatMoney(expense?.amount/( expense?.participants?.length + 1)) }
            </p>
          </div>
          <div className="expense-main-content-wrapper">
            <ul className="expense-main-list">
              {expense?.participants?.map((participant) => (
                <li key={participant?.id}>
                  <img
                    src={participant?.friendship?.friend?.image_url}
                    alt={participant?.friendship?.friend?.short_name}
                  />
                  <p>
                    {participant?.friendship?.friend?.short_name} owes {" "}
                    {formatMoney(participant?.amount_due)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="expense-main-content expense-comment">
          <p className="expense-comment-text">
            <img
              className="expense-icon"
              src="https://res.cloudinary.com/dr1ekjmf4/image/upload/v1688652280/icons8-comment-50_eh2i18.png"
              alt="comment icon"
            />
            Notes and Comments
          </p>
          <ul className="expense-comment">
            {comments.map((comment) => (
              <li key={comment.id} className="expense-comment-item">
                <p className="expense-comment-title">
                  {comment?.user?.short_name}
                  {new Date().getMonth() ===
                    new Date(comment?.created_at).getMonth() &&
                  new Date().getDate() ===
                    new Date(comment?.created_at).getDate() ? (
                    <span className="expense-comment-span">Today</span>
                  ) : (
                    <span className="expense-comment-span">
                      {" "}
                      {month[new Date(comment?.created_at).getMonth()]}{" "}
                      {new Date(comment?.created_at).getDate()}
                    </span>
                  )}
                </p>
                <div className="expense-icon-wrapper">
                  <span onClick={() => alert("feature coming soon")}>
                    <img
                      src="https://res.cloudinary.com/dr1ekjmf4/image/upload/v1688651618/icons8-pencil-50_1_cg3jui.png"
                      alt="edit icon"
                    />
                  </span>
                  <span
                    className="expense-close"
                    onClick={() => handleDelete(comment.id)}
                  >
                    X
                  </span>
                </div>
                <p className="expense-comment-text">{comment?.comment}</p>
              </li>
            ))}
          </ul>
          <form className="expense-comment-form" onSubmit={handleCommentCreate}>
            <label>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add comment"
                value={comment}
              ></textarea>
              {error.message && (
                <span className="expense-error">{error.message}</span>
              )}
            </label>

            <button
              disabled={!!error.message}
              className="expense-btn expense-post-btn"
              type="submit"
            >
              Post
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default ExpenseDetailsSection;
