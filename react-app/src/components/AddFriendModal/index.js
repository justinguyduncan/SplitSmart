import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import logo from './splitsmart-logo.png';
import './AddFriend.css'

function AddFriendModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    return (
        <>
            <h1><img className="add-friend-logo" src={logo} alt="add-friend-logo"></img>Invite friends</h1>
            <form>
                <input
                    placeholder="Enter email address"
                ></input>
                <input
                    placeholder="Include an optional message"
                ></input>
                <button className="accent">Send invites and add friends</button>
            </form>
        </>
    );
}

export default AddFriendModal;
