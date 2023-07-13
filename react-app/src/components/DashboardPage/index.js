import LeftNavigationBar from "../LeftNavigationBar";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSummary } from "../../store/expense";
import { fetchFriendships } from "../../store/friend";
import TopNavigationBar from "../TopNavigationBar";
import MainHeader from "../MainHeader";
import "./DashboardPage.css";

function DashboardPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const summary = useSelector((state) => state.expense.summary);
  const friend = useSelector((state) => state.friend);
  const friendship = Object.values(friend.friendships);
  const youOwe = friendship.filter((item) => item.bill > 0);
  const youAreOwed = friendship.filter((item) => item.bill < 0);
  useEffect(() => {
    dispatch(getSummary());
    dispatch(fetchFriendships());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/" />;
  return (
    <>
      <LeftNavigationBar />
      <TopNavigationBar />
      <MainHeader />
      <main className="dashboard-main">
        <section className="dashboard-subheader">
          <ul className="dashboard-subheader-list">
            <li>
              <p className="dashboard-subheader-list-text">total balance: </p>
              {summary["you owe"] < summary["you are owed"] ? (
                <p className={`dashboard-subheader-text dashboard-subheader-text-orange`}>
                  -${Math.abs(summary.balance)}.00
                </p>
              ) : (
                <p className={`dashboard-subheader-text dashboard-subheader-text-green`}>
                  + ${Math.abs(summary.balance)}.00
                </p>
              )}
            </li>
            <li className="dashboard-subheader-item">
              <p className="dashboard-subheader-list-text">you owe: </p>

              <p className={`dashboard-subheader-text dashboard-subheader-text-orange`}>
                ${+summary["you owe"]}.00
              </p>
            </li>
            <li>
              <p className="dashboard-subheader-list-text">you are owed: </p>

              <p className={`dashboard-subheader-text dashboard-subheader-text-green`}>
                ${+summary["you are owed"]}.00
              </p>
            </li>
          </ul>
        </section>

        <section className="dashboard-owed-section">
          <div className="dashboard-owed-wrapper">
            <h4 className="dashboard-owed-title">YOU OWE</h4>
            {youOwe.length ? (
              <ul className="dashboard-owed-list">
                {youOwe.map((item) => (
                  <li className="dashboard-owed-item" key={item.id}>
                    <NavLink to={`/friends/${item.id}`}>
                      <img src={item.friend.image_url} alt={item.friend.name} />
                      <div>
                        <p>{item.friend.name}</p>
                        <p className="dashboard-subheader-text-orange">
                          -${+item.bill}.00
                        </p>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dashboard-no-owe">You don't owe anything</p>
            )}
          </div>
          <div className="dashboard-owed-wrapper dashboard-owed-wrapper-right">
            <h4 className="dashboard-owed-title dashboard-owed-title-right ">YOU ARE OWED</h4>
            {youAreOwed.length ? (
              <ul className="dashboard-owed-list">
                {youAreOwed.map((item) => (
                  <li className="dashboard-owed-item" key={item.id}>
                    <NavLink to={`/friends/${item.id}`}>
                      <img src={item.friend.image_url} alt={item.friend.name} />
                      <div>
                        <p>{item.friend.name}</p>
                        <p className="dashboard-subheader-text-green">
                           owes you ${Math.abs(item.bill)}.00
                        </p>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            ):(  <p className="dashboard-no-owe">You are not owed anything</p>)}
          </div>
        </section>
      </main>
    </>
  );
}

export default DashboardPage;
