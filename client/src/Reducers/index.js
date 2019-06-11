import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import financeReducer from "./financeReducer";
import employeeReducer from "./employeeReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  employee: employeeReducer,
  finance: financeReducer,
  admin: adminReducer,
  order: orderReducer
});
