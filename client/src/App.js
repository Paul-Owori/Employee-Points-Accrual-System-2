import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeSignUp from "./Components/EmployeeSignUp";
import EmployeeLanding from "./Components/EmployeeLanding";
import FinanceSignUp from "./Components/FinanceSignUp";
import FinanceLanding from "./Components/FinanceLanding";
import AdminSignup from "./Components/AdminSignup";
import AdminLanding from "./Components/AdminLanding";
import AppNavbar from "./Components/AppNavbar";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
//import AppNavbar from "./Components/AppNavbar";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Route path="/" component={AppNavbar} />
          <Route exact path="/" component={EmployeeSignUp} />
          <Route exact path="/employee/landing" component={EmployeeLanding} />
          <Route exact path="/finance/signup" component={FinanceSignUp} />
          <Route exact path="/admin/signup" component={AdminSignup} />
          <Route exact path="/admin/landing" component={AdminLanding} />
          <Route exact path="/finance/landing" component={FinanceLanding} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
