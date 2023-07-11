import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './AddFriend.css'

function AddFriendModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    return (
        <>
            <h1>AddFriend Modal</h1>
        </>
    );
}

export default AddFriendModal;
