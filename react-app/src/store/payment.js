// src/reducers/payment.js

// Action types
const SET_RECEIVED_PAYMENTS = 'payment/SET_RECEIVED_PAYMENTS';
const SET_SENT_PAYMENTS = 'payment/SET_SENT_PAYMENTS';
const ADD_PAYMENT = 'payment/ADD_PAYMENT';
const DELETE_PAYMENT = 'payment/DELETE_PAYMENT';
const SET_SELECTED_PAYMENT = 'payment/SET_SELECTED_PAYMENT';

// Action creators
export const setReceivedPayments = (payments) => ({
  type: SET_RECEIVED_PAYMENTS,
  payload: payments,
});

export const setSentPayments = (payments) => ({
  type: SET_SENT_PAYMENTS,
  payload: payments,
});

export const addPayment = (payment) => ({
  type: ADD_PAYMENT,
  payload: payment,
});

export const deletePayment = (paymentId) => ({
  type: DELETE_PAYMENT,
  payload: paymentId,
});

export const setSelectedPayment = (payment) => ({
  type: SET_SELECTED_PAYMENT,
  payload: payment,
});

// Async action: Fetch received payments
export const fetchReceivedPayments = () => async (dispatch) => {
  try {
    const response = await fetch('/api/payments/received');
    if (!response.ok) {
      throw new Error('Failed to fetch received payments');
    }
    const data = await response.json();
    dispatch(setReceivedPayments(data.received));
  } catch (error) {
    console.error('Error fetching received payments:', error.message);
  }
};

// Async action: Fetch sent payments
export const fetchSentPayments = () => async (dispatch) => {
  try {
    const response = await fetch('/api/payments/sent');
    if (!response.ok) {
      throw new Error('Failed to fetch sent payments');
    }
    const data = await response.json();
    dispatch(setSentPayments(data.sent));
  } catch (error) {
    console.error('Error fetching sent payments:', error.message);
  }
};

// Async action: Fetch payment by ID
export const fetchPaymentById = (paymentId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/payments/${paymentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch payment');
      }
      const data = await response.json();
      dispatch(setSelectedPayment(data));
    } catch (error) {
      console.error('Error fetching payment:', error.message);
    }
  };

// Async action: Create a payment
export const createPayment = (amount, friendshipId) => async (dispatch) => {
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          friendship_id: friendshipId,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create payment');
      }
      const data = await response.json();
      dispatch(addPayment(data));
    } catch (error) {
      console.error('Error creating payment:', error.message);
    }
  };

// Async action: Delete a payment
export const fetchDeletePayment = (paymentId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/payments/${paymentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete payment');
      }
      dispatch({ type: DELETE_PAYMENT, payload: paymentId });
    } catch (error) {
      console.error('Error deleting payment:', error.message);
    }
  };

// Reducer
const initialState = {
  receivedPayments: [],
  sentPayments: [],
  selectedPayment: null,
};

export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECEIVED_PAYMENTS:
      return {
        ...state,
        receivedPayments: action.payload,
      };
    case SET_SENT_PAYMENTS:
      return {
        ...state,
        sentPayments: action.payload,
      };
    case ADD_PAYMENT:
      return {
        ...state,
        sentPayments: [...state.sentPayments, action.payload],
      };
    case DELETE_PAYMENT:
      return {
        ...state,
        sentPayments: state.sentPayments.filter((payment) => payment.id !== action.payload),
      };
    case SET_SELECTED_PAYMENT:
      return {
        ...state,
        selectedPayment: action.payload,
      };
    default:
      return state;
  }
}
