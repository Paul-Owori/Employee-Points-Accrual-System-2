import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader
} from "reactstrap";
import "./css/css_for_all.css";

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
    console.log("this.props");
    const currentEmployee = JSON.parse(sessionStorage.getItem("employee"));
    currentEmployee
      ? this.setState({ employee: currentEmployee })
      : this.setState({ employee: {} });
  }

  componentWillReceiveProps() {
    if (this.props.order.orders && this.props.order.orders.length) {
      this.setState({
        orders: this.props.order.orders
      });
    }
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
    orders: [],
    order_for: "",
    order_price: "",
    warnModal: false,
    warnModalText: ""
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  orderChecker = () => {
    if (this.props.order.orders && this.props.order.orders.length) {
      return true;
    } else {
      return false;
    }
  };

  preOrder = e => {
    e.preventDefault();

    if (
      pointsLeft(this.state.employee) !== 0 &&
      pointsLeft(this.state.employee) >= this.state.order_price
    ) {
      let order = {};

      order.employee_id = this.state.employee.employee_id;
      order.order_for = this.state.order_for;
      order.order_price = this.state.order_price;
      if (order.order_for && order.order_price) {
        this.props.preOrder(order);

        this.setState({
          order_for: "",
          order_price: "",
          warnModalText:
            "Your pre order has been placed successfuly to confirm it, please check your cart"
        });
        setTimeout(() => {
          this.warnModaltoggle();
        }, 500);
      } else {
        this.setState({
          warnModalText:
            "Something went wrong! Please check to make sure all fields have content."
        });
        setTimeout(() => {
          this.warnModaltoggle();
        }, 500);
      }
    } else {
      this.setState({
        warnModalText: "Sorry, You do not have enough points for this benefit"
      });
      setTimeout(() => {
        this.warnModaltoggle();
      }, 500);
    }
  };

  confirmOrder = preOrders => {
    this.props.addOrders(preOrders);
  };

  warnModaltoggle = () => {
    this.setState({ warnModal: !this.state.warnModal });
    setTimeout(() => {
      this.setState({ warnModal: !this.state.warnModal });
    }, 1500);
  };

  render() {
    return (
      <Container fluid className="allContainer">
        <div className="text-center">
          <h2 className="font-weight-bold   text-center my-3">
            Welcome{" "}
            {this.state.employee
              ? this.state.employee.employee_firstName
              : this.props.employee.employee
              ? this.props.employee.employee.employee_firstName
              : ""}
            !
          </h2>
          <h5 className="font-weight-bold   text-center">
            Employment seniority tier:{" "}
            {this.state.employee
              ? this.state.employee.employee_seniority
              : this.props.employee.employee
              ? this.props.employee.employee.seniority
              : ""}
          </h5>
          <h5 className="font-weight-bold   text-center">
            Available benefit points:{" "}
            {this.state.employee ? pointsLeft(this.state.employee) : 0}
          </h5>

          <p className="font-weight-bold   text-center my-3">Place an order;</p>
        </div>

        <Row className="justify-content-center ">
          <Col xs="6" className="text-center defaultBackground">
            <Form className="text-center my-5" onSubmit={this.preOrder}>
              <FormGroup>
                <Input
                  type="text"
                  className="form-control"
                  id="order_for"
                  name="order_for"
                  placeholder="What would you like to order for?"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className="mb-5 ">
                <Input
                  type="Number"
                  className="form-control"
                  id="order_price"
                  name="order_price"
                  placeholder="How many points does the order cost? *Numbers only*"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <Button
                color="light"
                block
                type="submit"
                className="mb-3 align-bottom"
              >
                Place pre Order
              </Button>
            </Form>
          </Col>
        </Row>

        <Modal isOpen={this.state.warnModal} toggle={this.warnModaltoggle}>
          <ModalHeader toggle={this.warnModaltoggle}>
            {this.state.warnModalText}
          </ModalHeader>
        </Modal>
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
