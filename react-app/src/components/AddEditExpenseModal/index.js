import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';


function AddEditExpenseModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    return (
        <>
            <h1>AddEditExpenseModal</h1>
        </>
    );
}

export default AddEditExpenseModal
