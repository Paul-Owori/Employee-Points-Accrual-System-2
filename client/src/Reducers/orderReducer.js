import {
  GET_ORDERS,
  GET_ORDER,
  ADD_ORDERS,
  DELETE_ORDER,
  ORDERS_LOADING,
  GET_ORDERS_EMPLOYEE,
  UPDATE_ORDER,
  PRE_ORDER,
  DELETE_PRE_ORDER,
  UPDATE_ORDER_APPROVAL,
  GET_ORDERS_NOT_REVIEWED
} from "../Types/orderTypes";

const initialState = {
  orders: [],
  order: {},
  pre_orders: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, orders: action.payload, loading: false };
    case GET_ORDERS_NOT_REVIEWED:
      return { ...state, orders: action.payload, loading: false };
    case GET_ORDERS_EMPLOYEE:
      return { ...state, orders: action.payload, loading: false };
    case GET_ORDER:
      return { ...state, order: action.payload, loading: false };
    case DELETE_ORDER:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter(order => order._id !== action.payload)
      };
    case DELETE_PRE_ORDER:
      return {
        ...state,
        loading: false,
        pre_orders: state.pre_orders.filter(
          order => order.id !== action.payload
        )
      };

    case UPDATE_ORDER_APPROVAL:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter(order => order.id !== action.payload)
      };

    case PRE_ORDER:
      return {
        ...state,
        pre_orders: [...state.pre_orders, action.payload],
        loading: false
      };
    case ADD_ORDERS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        order: action.payload,
        loading: false
      };
    case ORDERS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
