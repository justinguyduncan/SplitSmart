import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as friendActions from '../../store/friend';
import LeftNavigationBar from "../LeftNavigationBar";
import PaymentDetailsSection from "../PaymentDetailsSection";


function FriendPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const friend = useSelector(state => state.friend.selectedFriendship);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(friendActions.fetchFriendshipById(id))
            .then(() => setIsLoaded(true));
    }, [dispatch, id]);

    return (
        <>
            <h1>Friend Page</h1>
            {isLoaded && <h1>Friend Page {friend.id} - {friend.friend.name}</h1>}
            <PaymentDetailsSection paymentId={2} />
            <LeftNavigationBar />
        </>
    );
}

export default FriendPage;
