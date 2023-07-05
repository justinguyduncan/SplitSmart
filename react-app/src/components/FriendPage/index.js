import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as friendActions from '../../store/friend';
import * as expenseActions from '../../store/expense';
import * as paymentActions from '../../store/payment';
import LeftNavigationBar from "../LeftNavigationBar";
import receipt from "./receipt.jpeg";
import './FriendPage.css';


function formatMoney(amount) {
    return "$" + String(Number(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
};

function FriendPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const friend = useSelector(state => state.friend.selectedFriendship);
    const userExpenses = useSelector(state => {
        let expenses = Object.values(state.expense.createdExpenses).filter(expense => {
            const friendOnly = expense.participants.filter(participant => participant.friendship_id == id);
            return friendOnly.length > 0;
        });
        return expenses;
    });
    const unsettledExpenses = useSelector(state => {
        let expenses = Object.values(state.expense.unsettledExpenses).filter(expense => {
            return expense.friendship.user_id == friend.friend_id;
        });
        return expenses;
    });
    const settledExpenses = useSelector(state => {
        let expenses = Object.values(state.expense.settledExpenses).filter(expense => {
            return expense.friendship.user_id == friend.friend_id;
        });
        return expenses;
    });
    const sentPayments = useSelector(state => {
        let payments = Object.values(state.payment.sentPayments).filter(payment => {
            return payment.friendship_id == id;
        });
        return payments;
    });
    const receivedPayments = useSelector(state => {
        let payments = Object.values(state.payment.receivedPayments).filter(payment => {
            return payment.friendship.user_id == friend.friend_id;
        });
        return payments;
    })

    const [isFriendLoaded, setIsFriendLoaded] = useState(false);
    const [isUserExpensesLoaded, setIsUserExpensesLoaded] = useState(false);
    const [isUnsettledExpensesLoaded, setIsUnsettledExpensesLoaded] = useState(false);
    const [isSettledExpensesLoaded, setIsSettledExpensesLoaded] = useState(false);
    const [isSentPaymentsLoaded, setIsSentPaymentsLoaded] = useState(false);
    const [isReceivedPaymentsLoaded, setIsReceivedPaymentsLoaded] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await dispatch(friendActions.fetchFriendshipById(id))
                .then(() => setIsFriendLoaded(true));
            await dispatch(expenseActions.getCreatedExpenses())
                .then(() => setIsUserExpensesLoaded(true));
            await dispatch(expenseActions.getUnsettledExpenses())
                .then(() => setIsUnsettledExpensesLoaded(true));
            await dispatch(expenseActions.getSettledExpenses())
                .then(() => setIsSettledExpensesLoaded(true));
            await dispatch(paymentActions.fetchSentPayments())
                .then(() => setIsSentPaymentsLoaded(true));
            await dispatch(paymentActions.fetchReceivedPayments())
                .then(() => setIsReceivedPaymentsLoaded(true));
        }
        fetchData();
    }, [dispatch, id]);

    return (
        <>
            {isFriendLoaded && <h1>Friend Page - {friend.friend.name}</h1>}
            <LeftNavigationBar />
            <h3>User Created Expenses</h3>
            <div>
                {isUserExpensesLoaded &&
                    userExpenses.map(expenseObj => {
                        const dateStr = new Date(expenseObj.created_at).toDateString();
                        const dateMonth = `${dateStr.split(" ")[1].toUpperCase()}`;
                        const dateDay = `${dateStr.split(" ")[2]}`;
                        return (
                            <div className="expense-header">
                                <div className="expense-header-date">
                                    <p className="expense-header-month">{dateMonth}</p>
                                    <p className="expense-header-day">{dateDay}</p>
                                </div>
                                <img className="expense-header-logo-img" src={receipt}></img>
                                <div className="expense-header-description">
                                    {expenseObj.description}
                                </div>
                                <div className="expense-header-A">
                                    <p>you paid</p>
                                    <p>{formatMoney(expenseObj.amount)}</p>
                                </div>
                                <div className="expense-header-B">
                                    <p>you lent {friend.friend.short_name}</p>
                                    <p>{formatMoney(expenseObj.participants[0].amount_due)}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <h3>Friend Created Expenses - Unsettled</h3>
            <div>
                {isUnsettledExpensesLoaded &&
                    unsettledExpenses.map(expenseObj => {
                        const dateStr = new Date(expenseObj.created_at).toDateString();
                        const dateMonth = `${dateStr.split(" ")[1].toUpperCase()}`;
                        const dateDay = `${dateStr.split(" ")[2]}`;
                        return (
                            <div className="expense-header">
                                <div className="expense-header-date">
                                    <p className="expense-header-month">{dateMonth}</p>
                                    <p className="expense-header-day">{dateDay}</p>
                                </div>
                                <img className="expense-header-logo-img" src={receipt}></img>
                                <div className="expense-header-description">
                                    {expenseObj.expense.description}
                                </div>
                                <div className="expense-header-A">
                                    <p>{friend.friend.short_name} paid</p>
                                    <p>{formatMoney(expenseObj.expense.amount)}</p>
                                </div>
                                <div className="expense-header-B">
                                    <p>{friend.friend.short_name} lent you</p>
                                    <p>{formatMoney(expenseObj.amount_due)}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <h3>Friend Created Expenses - Settled</h3>
            <div>
                {isSettledExpensesLoaded &&
                    settledExpenses.map(expenseObj => {
                        const dateStr = new Date(expenseObj.created_at).toDateString();
                        const dateMonth = `${dateStr.split(" ")[1].toUpperCase()}`;
                        const dateDay = `${dateStr.split(" ")[2]}`;
                        return (
                            <div className="expense-header">
                                <div className="expense-header-date">
                                    <p className="expense-header-month">{dateMonth}</p>
                                    <p className="expense-header-day">{dateDay}</p>
                                </div>
                                <img className="expense-header-logo-img" src={receipt}></img>
                                <div className="expense-header-description">
                                    {expenseObj.expense.description}
                                </div>
                                <div className="expense-header-A">
                                    <p>{friend.friend.short_name} paid</p>
                                    <p>{formatMoney(expenseObj.expense.amount)}</p>
                                </div>
                                <div className="expense-header-B">
                                    <p>{friend.friend.short_name} lent you</p>
                                    <p>{formatMoney(expenseObj.amount_due)}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            {/* <h3>User Sent Payments</h3>
            <ul>
                {isSentPaymentsLoaded &&
                    sentPayments.map(paymentObj => {
                        const dateStr = new Date(paymentObj.created_at).toDateString();
                        const dateFormat = `${dateStr.split(" ")[1]} ${dateStr.split(" ")[2]}`
                        return (
                            <li key={paymentObj.id}>
                                <p>Payment Date: {dateFormat}</p>
                                <p>{sessionUser.short_name} paid {friend.friend.short_name} {paymentObj.amount}</p>
                            </li>
                        );
                    })
                }
            </ul> */}
            {/* <h3>User Received Payments</h3>
            <ul>
                {isReceivedPaymentsLoaded &&
                    receivedPayments.map(paymentObj => {
                        const dateStr = new Date(paymentObj.created_at).toDateString();
                        const dateFormat = `${dateStr.split(" ")[1]} ${dateStr.split(" ")[2]}`
                        return (
                            <li key={paymentObj.id}>
                                <p>Payment Date: {dateFormat}</p>
                                <p>{friend.friend.short_name} paid {sessionUser.short_name} {paymentObj.amount}</p>
                            </li>
                        );
                    })
                }
            </ul> */}
        </>
    );
}

export default FriendPage;
