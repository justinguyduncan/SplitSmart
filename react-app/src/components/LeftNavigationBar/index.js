import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as friendActions from '../../store/friend';
import './LeftNavigation.css';
import logo from './splitsmart-logo.png';

function LeftNavigationBar() {
    const dispatch = useDispatch();
    const activeFriends = useSelector(state => Object.values(state.friend.friendships));
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(friendActions.fetchFriendships())
            .then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div className="left-nav-bar">
            <NavLink to="/dashboard"><img className="dashboard-logo" src={logo}></img>Dashboard</NavLink>
            <NavLink to="/all"><i className="fas fa-solid fa-list" />All Expenses</NavLink>
            <p>FRIENDS</p>
            {isLoaded && activeFriends?.map(friendObj => (
                <NavLink to={`/friends/${friendObj.id}`}><i className="fas fa-solid fa-user" />{friendObj.friend.name}</NavLink>
            ))}
        </div>
    );
}

export default LeftNavigationBar;
