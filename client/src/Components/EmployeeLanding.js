import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { pointsLeft } from "../PointCalculator/index";

import { connect } from "react-redux";
import {
  addOrders,
  preOrder,
  deletePreOrder,
  getOrdersEmployee
} from "../Actions/orderActions";
import PropTypes from "prop-types";

class EmployeeLanding extends Component {
  componentWillMount() {
    const currentEmployee = JSON.parse(sessionStorage.getItem("employee"));
    currentEmployee
      ? this.setState({ employee: currentEmployee })
      : this.setState({ employee: {} });
  }

  //   componentDidMount() {
  //     this.props.getAvailableItems();
  //     setTimeout(() => {
  //       let availableItemArray = [];
  //       this.setState({ items: this.props.item.items });
  //     }, 150);
  //     console.log("Mounted");
  //   }

  state = {
    employee: {},
    loading: false,
    orders: []
  };

  checker = () => {
    if (this.props.order.orders && this.props.order.orders.length) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <Container>
        <h2 className="text-center">
          Welcome{" "}
          {this.state.employee
            ? this.state.employee.employee_firstName
            : this.props.employee.employee
            ? this.props.employee.employee.employee_firstName
            : ""}
          !
        </h2>
        <h2 className="text-center">
          Your seniority is of tier{" "}
          {this.state.employee
            ? this.state.employee.employee_seniority
            : this.props.employee.employee
            ? this.props.employee.employee.seniority
            : ""}
          !
        </h2>
        <h2 className="text-center">
          Your available points are{" "}
          {this.state.employee ? pointsLeft(this.state.employee) : 0}!
        </h2>

        <p>The following buttons are only for testing purposes;</p>

        <Container className="mb-5">
          <Row />
        </Container>
      </Container>
    );
  }
}

EmployeeLanding.propTypes = {
  addOrders: PropTypes.func.isRequired,
  preOrder: PropTypes.func.isRequired,
  deletePreOrder: PropTypes.func.isRequired,
  getOrdersEmployee: PropTypes.func.isRequired,
  order: PropTypes.object,
  employee: PropTypes.object
};

const mapStateToProps = state => ({
  order: state.order,
  employee: state.employee
});
export default connect(
  mapStateToProps,
  { addOrders, preOrder, deletePreOrder, getOrdersEmployee }
)(EmployeeLanding);
