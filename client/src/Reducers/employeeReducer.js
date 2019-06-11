import {
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  UPDATE_EMPLOYEE,
  GET_UPDATED_EMPLOYEE,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  EMPLOYEES_LOADING,
  SIGNIN_EMPLOYEE,
  LOGOUT_EMPLOYEE
} from "../Types/employeeTypes";

const initialState = {
  employees: [],
  employee: {},
  loading: false,
  loggedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES:
      return { ...state, employees: action.payload, loading: false };
    case GET_EMPLOYEE:
      return { ...state, admin: action.payload, loading: false };
    case LOGOUT_EMPLOYEE:
      return { ...state, employee: {}, loading: false, loggedIn: false };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        loading: false,
        employees: state.employees.filter(
          employee => employee._id !== action.payload
        )
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
        employee: action.payload,
        loading: false
      };
    case SIGNIN_EMPLOYEE:
      return {
        ...state,
        employee: action.payload,
        loading: false,
        loggedIn: true
      };
    case GET_UPDATED_EMPLOYEE:
      return {
        ...state,
        employee: action.payload,
        loading: false
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employee: action.payload,
        employees: [
          action.payload,
          ...state.employees.filter(
            employee => employee._id !== action.payload._id
          )
        ],
        loading: false
      };
    case EMPLOYEES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
