import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeSignUp from "./Components/EmployeeSignUp";
import EmployeeLanding from "./Components/EmployeeLanding";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Route exact path="/" component={EmployeeSignUp} />
          <Route exact path="/employee/landing" component={EmployeeLanding} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
