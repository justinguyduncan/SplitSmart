import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import AddFriendModal from '../AddFriendModal';
import SettleUpModal from '../SettleUpModal';
import OpenModalButton from '../OpenModalButton';
import AddEditExpenseModal from '../AddEditExpenseModal';
import './MainHeader.css';

const MainHeader = () => {
  const location = useLocation();
  const { openModal } = useModal();
  const friendships = useSelector((state) => Object.values(state.friend.friendships));

  const currentPage = useSelector((state) => {
    const path = location.pathname;
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/all':
        return 'All expenses';
      default:
        if (path.startsWith('/friends/')) {
          const friendshipId = Number(path.split('/')[2]);
          const friendship = friendships.find(
            (friendship) => friendship.id === friendshipId
          );
          return friendship?.friend?.name || '';
        }
        return '';
    }
  });

  return (
    <div className="main-header">
      <div className="main-header-title">{currentPage}</div>
      <div className="main-header-buttons">
        <OpenModalButton modalComponent={<AddEditExpenseModal />} buttonText={'Add expenses'} />
        <OpenModalButton modalComponent={<SettleUpModal />} buttonText={"Settle Up"} />
      </div>
    </div>
  );
};

export default MainHeader;
