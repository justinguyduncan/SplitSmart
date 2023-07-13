import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import AboutPage from "./components/AboutPage";
import DashboardPage from "./components/DashboardPage";
import AllExpensesPage from "./components/AllExpensesPage";
import EditFriendPage from "./components/EditFriendPage";
import FriendPage from "./components/FriendPage";
import { authenticate } from "./store/session";
import TopNavigationBar from "./components/TopNavigationBar";
import PaymentDetailsSection from "./components/PaymentDetailsSection";
// import MainHeader from "./components/MainHeader"; // Import the MainHeader component

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <TopNavigationBar isLoaded={isLoaded} />

   


      {/* {location.pathname !== "/" && <MainHeader />} */}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <AboutPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/all">
            <AllExpensesPage />
          </Route>
          <Route path="/friends/:id/edit">
            <EditFriendPage />
          </Route>
          <Route path="/friends/:id">
            <FriendPage />
          </Route>


          
        </Switch>
      )}
    </>
  );
}

export default App;
