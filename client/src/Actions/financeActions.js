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

export const getFinances = () => dispatch => {
  dispatch(setFinancesLoading());
  fetch("/finances")
    .then(res => res.json())
    .then(res => dispatch({ type: GET_FINANCES, payload: res }));
};

export const addFinance = finance => dispatch => {
  dispatch(setFinancesLoading());
  fetch("/finances/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(finance)
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      dispatch({ type: ADD_FINANCE, payload: response });
    });
};

export const signInFinance = finance => dispatch => {
  dispatch(setFinancesLoading());
  fetch("/finances/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(finance)
  })
    .then(response => {
      return response.json();
    })
    .then(res => {
      if (res && res.finance_firstName) {
        sessionStorage.setItem("finance", JSON.stringify(res));
        dispatch({ type: SIGNIN_FINANCE, payload: res });
      } else {
        console.log("Login failed");
      }
    });
};

export const financeLogout = () => dispatch => {
  dispatch(setFinancesLoading());
  sessionStorage.removeItem("finance");

  return {
    type: LOGOUT_FINANCE
  };
};

export const setFinancesLoading = () => {
  return {
    type: FINANCES_LOADING
  };
};
