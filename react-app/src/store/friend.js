// friend.js

// Action Types
const SET_FRIENDSHIPS = 'friend/SET_FRIENDSHIPS';
const SET_SELECTED_FRIENDSHIP = 'friend/SET_SELECTED_FRIENDSHIP';

// Action Creators
export const setFriendships = (friendships) => ({
  type: SET_FRIENDSHIPS,
  payload: friendships,
});

export const setSelectedFriendship = (friendship) => ({
  type: SET_SELECTED_FRIENDSHIP,
  payload: friendship,
});

// Thunks


// Fetch all friendships
export const fetchFriendships = () => async (dispatch) => {
    try {
      const response = await fetch('/api/friends');
      if (response.ok) {
        const data = await response.json();
        dispatch(setFriendships(data.friendships));
      } else {
        throw new Error('Failed to fetch friendships');
      }
    } catch (error) {
      console.error(error);
      // Handle error if necessary
    }
  };

  export const fetchFriendshipById = (friendshipId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/friends/${friendshipId}`);
      if (response.ok) {
        const data = await response.json();
        dispatch(setSelectedFriendship(data));
      } else {
        throw new Error(`Failed to fetch friendship with id ${friendshipId}`);
      }
    } catch (error) {
      console.error(error);
      // Handle error if necessary
    }
  };

  export const createFriendship = (email) => async (dispatch) => {
    try {
      const response = await fetch('/api/friends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(fetchFriendships()); // Refresh the friendships after creating a new one
      } else {
        throw new Error('Failed to create friendship');
      }
    } catch (error) {
      console.error(error);
      // Handle error if necessary
    }
  };

// Initial State
const initialState = {
  friendships: [],
  selectedFriendship: null,
};

// Reducer
const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FRIENDSHIPS:
      return { ...state, friendships: action.payload };
    case SET_SELECTED_FRIENDSHIP:
      return { ...state, selectedFriendship: action.payload };
    default:
      return state;
  }
};

export default friendReducer;
