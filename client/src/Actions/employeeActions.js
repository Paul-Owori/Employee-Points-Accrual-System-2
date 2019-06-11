import {
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  UPDATE_EMPLOYEE,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  EMPLOYEES_LOADING,
  SIGNIN_EMPLOYEE,
  LOGOUT_EMPLOYEE,
  GET_UPDATED_EMPLOYEE,
  REFUND_EMPLOYEE
} from "../Types/employeeTypes";

export const getEmployees = () => dispatch => {
  dispatch(setEmployeesLoading());
  fetch("/employees")
    .then(res => res.json())
    .then(res => dispatch({ type: GET_EMPLOYEES, payload: res }));
};

export const getEmployee = id => dispatch => {
  dispatch(setEmployeesLoading());
  fetch(`/employees/${id}`)
    .then(res => res.json())
    .then(res => dispatch({ type: GET_EMPLOYEE, payload: res }));
};

export const addEmployee = employee => dispatch => {
  dispatch(setEmployeesLoading());
  console.log("employee==>>", employee);
  fetch("/employees/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(employee)
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      dispatch({ type: ADD_EMPLOYEE, payload: response });
    });
};

export const signInEmployee = employee => dispatch => {
  dispatch(setEmployeesLoading());
  fetch("/employees/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(employee)
  })
    .then(response => {
      return response.json();
    })
    .then(res => {
      if (res && res.employee_firstName) {
        sessionStorage.setItem("employee", JSON.stringify(res));
        dispatch({ type: SIGNIN_EMPLOYEE, payload: res });
      } else {
        console.log("Login failed");
      }
    });
};

export const getUpdatedEmployee = id => dispatch => {
  dispatch(setEmployeesLoading());
  fetch(`/employees/updated/${id}`)
    .then(res => res.json())
    .then(res => {
      sessionStorage.setItem("employee", JSON.stringify(res));
      dispatch({ type: GET_UPDATED_EMPLOYEE, payload: res });
    });
};

export const refundEmployee = (id, pointsRefunded) => dispatch => {
  dispatch(setEmployeesLoading());

  fetch(`/employees/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pointsRefunded)
  }).then(response => {
    console.log(response);
  });
  dispatch({ type: REFUND_EMPLOYEE });
};

export const employeeLogout = () => dispatch => {
  dispatch(setEmployeesLoading());
  sessionStorage.removeItem("employee");
  return {
    type: LOGOUT_EMPLOYEE
  };
};

export const setEmployeesLoading = () => {
  return {
    type: EMPLOYEES_LOADING
  };
};
