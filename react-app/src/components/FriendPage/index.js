import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as friendActions from '../../store/friend';
import * as expenseActions from '../../store/expense';
import LeftNavigationBar from "../LeftNavigationBar";


function FriendPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
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
            return expense.friendship.user_id == friend.friend_id
        });
        return expenses;
    });
    const settledExpenses = useSelector(state => {
        let expenses = Object.values(state.expense.settledExpenses).filter(expense => {
            return expense.friendship.user_id == friend.friend_id
        });
        return expenses;
    });

    const [isFriendLoaded, setIsFriendLoaded] = useState(false);
    const [isUserExpensesLoaded, setIsUserExpensesLoaded] = useState(false);
    const [isUnsettledExpensesLoaded, setIsUnsettledExpensesLoaded] = useState(false);
    const [isSettledExpensesLoaded, setIsSettledExpensesLoaded] = useState(false);

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
        }
        fetchData();
    }, [dispatch, id]);

    // useEffect(() => {
    //     if (isUserExpensesLoaded) {
    //         userExpensesToFriend = userExpenses.filter(expense => {
    //             const friendOnly = expense.participants.filter(participant => participant.friendship_id == id);
    //             return friendOnly.length > 0;
    //         });
    //     }
    // }, [isUserExpensesLoaded]);

    return (
        <>
            {isFriendLoaded && <h1>Friend Page - {friend.friend.name}</h1>}
            <LeftNavigationBar />
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
        </>
    );
}

export default FriendPage;
