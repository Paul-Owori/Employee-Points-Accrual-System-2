import {
  GET_FINANCES,
  GET_FINANCE,
  UPDATE_FINANCE,
  ADD_FINANCE,
  DELETE_FINANCE,
  FINANCES_LOADING,
  SIGNIN_FINANCE,
  LOGOUT_FINANCE
} from "../Types/financeTypes";

const initialState = {
  finances: [],
  finance: {},
  loading: false,
  loggedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FINANCES:
      return { ...state, finances: action.payload, loading: false };
    case GET_FINANCE:
      return { ...state, finance: action.payload, loading: false };
    case LOGOUT_FINANCE:
      return { ...state, finance: {}, loading: false, loggedIn: false };
    case DELETE_FINANCE:
      return {
        ...state,
        loading: false,
        finances: state.finances.filter(
          finance => finance._id !== action.payload
        )
      };
    case ADD_FINANCE:
      return {
        ...state,
        finances: [...state.finances, action.payload],
        finance: action.payload,
        loading: false
      };
    case SIGNIN_FINANCE:
      return {
        ...state,
        finance: action.payload,
        loading: false,
        loggedIn: true
      };
    case UPDATE_FINANCE:
      return {
        ...state,
        finance: action.payload,
        finances: [
          action.payload,
          ...state.finances.filter(
            finance => finance._id !== action.payload._id
          )
        ],
        loading: false
      };
    case FINANCES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
