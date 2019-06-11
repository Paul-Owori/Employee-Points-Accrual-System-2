import {
  GET_ORDERS_EMPLOYEE,
  GET_ORDERS,
  GET_ORDERS_NOT_REVIEWED,
  GET_ORDER,
  ADD_ORDERS,
  DELETE_ORDER,
  PRE_ORDER,
  DELETE_PRE_ORDER,
  UPDATE_ORDER_APPROVAL,
  ORDERS_LOADING
} from "../Types/orderTypes";

export const getOrdersEmployee = id => dispatch => {
  dispatch(setOrdersLoading());
  fetch(`/orders/employee/${id}`)
    .then(res => res.json())
    .then(res => {
      sessionStorage.setItem("orders", JSON.stringify(res));
      dispatch({ type: GET_ORDERS_EMPLOYEE, payload: res });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};
export const getOrdersNotReviewed = adminOrFinance => dispatch => {
  dispatch(setOrdersLoading());
  fetch(`/orders/reviewed/${adminOrFinance}`)
    .then(res => res.json())
    .then(res => {
      sessionStorage.setItem("orders", JSON.stringify(res));
      dispatch({ type: GET_ORDERS_NOT_REVIEWED, payload: res });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

export const getOrders = id => dispatch => {
  dispatch(setOrdersLoading());
  fetch(`/orders`)
    .then(res => res.json())
    .then(res => {
      sessionStorage.setItem("orders", JSON.stringify(res));
      dispatch({ type: GET_ORDERS, payload: res });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

export const addOrders = (currentPointsSpent, orders) => dispatch => {
  dispatch(setOrdersLoading());
  console.log("ORDERS BEING SENT BY ACTIONS==>>", orders);
  console.log("CURRENT POINTS SPENT==>>", currentPointsSpent);
  let ordersTotalCost = currentPointsSpent;
  let ordersToDispatch = [];

  orders.forEach(order => {
    ordersTotalCost =
      parseFloat(order.order_price) + parseFloat(ordersTotalCost);
    fetch("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    }).then(response => {
      ordersToDispatch.push(response);
      console.log("RESPONSE==>", response);
    });
  });

  console.log("ORDER TOTAL COST==>>", ordersTotalCost);
  let pointsSpent = [
    {
      propName: `employee_pointsSpent`,
      value: `${ordersTotalCost}`
    }
  ];
  fetch(`/employees/${orders[0].employee_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pointsSpent)
  }).then(response => {
    console.log(response);
  });
  dispatch({ type: ADD_ORDERS, payload: ordersToDispatch });
};

export const updateOrderApproval = (adminOrFinance, order) => dispatch => {
  console.log("adminOrFinance FROM actions==>>", adminOrFinance);
  console.log("order FROM actions==>>", order);
  dispatch(setOrdersLoading());
  let toUpdate = [];
  if (adminOrFinance === "admin") {
    toUpdate = [
      {
        propName: `admin_viewed_by`,
        value: `${order.admin_viewed_by}`
      },
      {
        propName: `admin_approval_status`,
        value: `${order.admin_approval_status}`
      }
    ];
  } else if (adminOrFinance === "finance") {
    toUpdate = [
      {
        propName: `finance_viewed_by`,
        value: `${order.finance_viewed_by}`
      },
      {
        propName: `finance_approval_status`,
        value: `${order.finance_approval_status}`
      }
    ];
  }

  console.log("toUpdate from actions==>>", toUpdate);
  fetch(`/orders/${order._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toUpdate)
  }).then(response => {
    console.log(response);
  });

  let oldOrders = JSON.parse(sessionStorage.getItem("orders"));
  let newOrders = oldOrders.filter(
    anyOtherOrder => anyOtherOrder._id !== order._id
  );
  sessionStorage.setItem("orders", JSON.stringify(newOrders));

  dispatch({ type: UPDATE_ORDER_APPROVAL, payload: order });
};

export const deleteOrder = id => dispatch => {
  dispatch(setOrdersLoading());

  fetch(`/orders/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      dispatch({ type: DELETE_ORDER, payload: response });
    });
};

export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING
  };
};

export const preOrder = order => dispatch => {
  dispatch(setOrdersLoading());
  let cart = [];
  cart.push(order);
  if (sessionStorage.getItem("cart") === null) {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  } else {
    let oldCart = JSON.parse(sessionStorage.getItem("cart"));
    if (oldCart.includes(order) === false) {
      let newCart = [...oldCart, ...cart];
      sessionStorage.setItem("cart", JSON.stringify(newCart));
    }
  }
  dispatch({ type: PRE_ORDER, payload: order });
};

export const deletePreOrder = id => dispatch => {
  dispatch(setOrdersLoading());
  let oldCart = JSON.parse(sessionStorage.getItem("cart"));
  let newCart = oldCart.filter(employee => {
    return employee._id !== id;
  });
  sessionStorage.setItem("cart", JSON.stringify(newCart));

  dispatch({ type: PRE_ORDER, payload: id });
};
