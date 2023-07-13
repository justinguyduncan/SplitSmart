import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

function SettleUpModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    return (
        <>
            <h1>SettleUpModal</h1>
        </>
    );
}

export default SettleUpModal;
