import LeftNavigationBar from "../LeftNavigationBar";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSummary } from "../../store/expense";
import { fetchFriendships } from "../../store/friend";
import MainHeader from "../MainHeader";
import "./DashboardPage.css";
function DashboardPage() {
  const dispatch = useDispatch();
  const summary = useSelector((state) => state.expense.summary);
  const friend = useSelector((state) => state.friend);
  const friendship = Object.values(friend.friendships);
  const youOwe = friendship.filter((item) => item.bill > 0);
  const youAreOwed = friendship.filter((item) => item.bill < 0);
  useEffect(() => {
    dispatch(getSummary());
    dispatch(fetchFriendships());
  }, [dispatch]);
  return (
    <div className="container main-wrapper">
      <LeftNavigationBar />

      <main className="main">
        <MainHeader />
        <section className="subheader">
          <ul className="subheader-list">
            <li>
              <p className="subheader-list-text">total balance: </p>
              {summary["you owe"] > summary["you are owed"] ? (
                <p className={`subheader-text subheader-text-orange`}>
                  - ${+summary.balance}.00
                </p>
              ) : (
                <p className={`subheader-text subheader-text-green`}>
                  + ${+summary.balance}.00
                </p>
              )}
            </li>
            <li>
              <p className="subheader-list-text">you owe: </p>

              <p className={`subheader-text subheader-text-orange`}>
                ${+summary["you owe"]}.00
              </p>
            </li>
            <li>
              <p className="subheader-list-text">you are owed: </p>

              <p className={`subheader-text subheader-text-green`}>
                ${+summary["you are owed"]}.00
              </p>
            </li>
          </ul>
        </section>

        <section>
          <ul>
            {youAreOwed.map((item) => (
              <li className="dashboard-list" key={item.id}>
                <NavLink to={`/friend/${item.friend_id}`}>
                  <img src={item.friend.image_url} alt={item.friend.name} />
                  <p>{item.friend.name}</p>
                  <p>${+item.bill}.00</p>
                </NavLink>
              </li>
            ))}
          </ul>

          <ul>
            {youOwe.map((item) => (
              <li className="dashboard-list" key={item.id}>
                <NavLink to={`/friend/${item.friend_id}`}>
                  <img src={item.friend.image_url} alt={item.friend.name} />
                  <p>{item.friend.name}</p>
                  <p>${+item.bill}.00</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;
