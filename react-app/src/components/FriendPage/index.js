import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as friendActions from '../../store/friend';
import LeftNavigationBar from "../LeftNavigationBar";


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
            {isLoaded/* && <h1>Friend Page {friend.id} - {friend.friend.name}</h1>*/}
            <LeftNavigationBar />
        </>
    );
}

export default FriendPage;
