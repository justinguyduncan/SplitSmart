import React from 'react';
import { NavLink } from 'react-router-dom';

function LeftNavigationBar() {
    return (
        <div className="left-nav-bar">
            <h1>LeftNavigation Bar</h1>
            <NavLink to="/dashboard"><i className="fas fa-solid fa-comments-dollar" />Dashboard</NavLink>
            <NavLink to="/all"><i className="fas fa-solid fa-list" />All Expenses</NavLink>
            <div className="friends-list">

            </div>
        </div>
    );
}

export default LeftNavigationBar;
