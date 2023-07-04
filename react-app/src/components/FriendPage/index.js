import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as friendActions from '../../store/friend';
import * as expenseActions from '../../store/expense';
import * as paymentActions from '../../store/payment';
import LeftNavigationBar from "../LeftNavigationBar";


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
            <ul>
                {isUserExpensesLoaded &&
                    userExpenses.map(expenseObj => {
                        const dateStr = new Date(expenseObj.created_at).toDateString();
                        const dateFormat = `${dateStr.split(" ")[1]} ${dateStr.split(" ")[2]}`
                        return (
                            <li key={expenseObj.id}>
                                <p>Expense Date: {dateFormat}</p>
                                <p>Description: {expenseObj.description}</p>
                                <p>You Paid: {expenseObj.amount}</p>
                                <p>You Lent {friend.friend.short_name}: {expenseObj.participants[0].amount_due} </p>
                            </li>
                        );
                    })
                }
            </ul>
            <h3>Friend Created Expenses - Unsettled</h3>
            <ul>
                {isUnsettledExpensesLoaded &&
                    unsettledExpenses.map(expenseObj => {
                        const dateStr = new Date(expenseObj.created_at).toDateString();
                        const dateFormat = `${dateStr.split(" ")[1]} ${dateStr.split(" ")[2]}`
                        return (
                            <li key={expenseObj.id}>
                                <p>Expense Date: {dateFormat}</p>
                                <p>Description: {expenseObj.expense.description}</p>
                                <p>{friend.friend.short_name} Paid: {expenseObj.expense.amount}</p>
                                <p>{friend.friend.short_name} Lent You: {expenseObj.amount_due} </p>
                            </li>
                        );
                    })
                }
            </ul>
            <h3>Friend Created Expenses - Settled</h3>
            <ul>
                {isSettledExpensesLoaded &&
                    settledExpenses.map(expenseObj => {
                        const dateStr = new Date(expenseObj.created_at).toDateString();
                        const dateFormat = `${dateStr.split(" ")[1]} ${dateStr.split(" ")[2]}`
                        return (
                            <li key={expenseObj.id}>
                                <p>Expense Date: {dateFormat}</p>
                                <p>Description: {expenseObj.expense.description}</p>
                                <p>{friend.friend.short_name} Paid: {expenseObj.expense.amount}</p>
                                <p>{friend.friend.short_name} Lent You: {expenseObj.amount_due} </p>
                            </li>
                        );
                    })
                }
            </ul>
            <h3>User Sent Payments</h3>
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
            </ul>
            <h3>User Received Payments</h3>
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
            </ul>
        </>
    );
}

export default FriendPage;
