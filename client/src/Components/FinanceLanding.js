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
import { TransitionGroup } from "react-transition-group";
import { pointsLeft } from "../PointCalculator/index";

import { connect } from "react-redux";
import {
  getOrdersNotReviewed,
  updateOrderApproval
} from "../Actions/orderActions";
import { getEmployee, refundEmployee } from "../Actions/employeeActions";
import PropTypes from "prop-types";

class FinanceLanding extends Component {
  componentWillMount() {
    this.props.getOrdersNotReviewed("finance");
    if (this.props.order.orders && this.props.order.orders.length) {
      this.setState({ orders: this.props.order.orders });
    } else if (JSON.parse(sessionStorage.getItem("orders")) !== null) {
      this.setState({ orders: JSON.parse(sessionStorage.getItem("orders")) });
    }

    console.log("this.props==>>", this.props);
    console.log(
      "finance loggedin==>>",
      JSON.parse(sessionStorage.getItem("finance"))
    );
    console.log(
      "orders saved==>>",
      JSON.parse(sessionStorage.getItem("orders"))
    );

    const currentFinance = JSON.parse(sessionStorage.getItem("finance"));
    currentFinance
      ? this.setState({ finance: currentFinance })
      : this.setState({ finance: {} });
  }

  componentWillReceiveProps() {
    if (this.props.order.orders && this.props.order.orders.length) {
      let currentOrders = this.props.order.orders
        ? this.props.order.orders
        : JSON.parse(sessionStorage.getItem("orders")) !== null
        ? JSON.parse(sessionStorage.getItem("orders"))
        : [];
      let currentFinance = this.props.finance.finance
        ? this.props.finance.finance.finance_firstName
        : JSON.parse(sessionStorage.getItem("finance")) !== null
        ? JSON.parse(sessionStorage.getItem("finance"))
        : "";
      this.setState({
        orders: currentOrders,
        finance: currentFinance
      });
    }
  }

  state = {
    employee: {},
    finance: {},
    loading: false,
    orders: [],
    employeeModal: false,
    employeeModalText: ""
  };

  orderChecker = () => {
    if (this.props.order.orders && this.props.order.orders.length) {
      return true;
    } else {
      return false;
    }
  };

  monthDiff = joinDate => {
    let today = new Date();
    let months;
    months =
      (new Date(today).getFullYear() - new Date(joinDate).getFullYear()) * 12;
    months -= new Date(today).getMonth();
    months += new Date(joinDate).getMonth();
    return months <= 0 ? 0 : months;
  };

  employeeModaltoggle = () => {
    this.setState({ employeeModal: !this.state.employeeModal });
  };

  employeeDetails = id => {
    this.props.getEmployee(id);
    setTimeout(() => {
      this.setState({ employee: this.props.employee.employee });
      setTimeout(() => {
        this.employeeModaltoggle();
      }, 300);
    }, 300);
  }; //(id, pointsRefunded)
  approveOrRejectOrder = statusAndId => {
    let financeId = JSON.parse(sessionStorage.getItem("finance"))._id;
    let order = {
      finance_viewed_by: financeId,
      finance_approval_status: statusAndId.approved,
      _id: statusAndId._id
    };

    console.log("Order being updated", order);
    this.props.updateOrderApproval("finance", order);

    setTimeout(() => {
      if (this.props.order.orders && this.props.order.orders.length) {
        let currentOrders = this.props.order.orders
          ? this.props.order.orders
          : JSON.parse(sessionStorage.getItem("orders")) !== null
          ? JSON.parse(sessionStorage.getItem("orders"))
          : [];
        let currentFinance = this.props.finance.finance
          ? this.props.finance.finance.finance_firstName
          : JSON.parse(sessionStorage.getItem("finance")) !== null
          ? JSON.parse(sessionStorage.getItem("finance"))
          : "";
        this.setState({
          orders: currentOrders,
          finance: currentFinance
        });
      }
    }, 500);
    if (statusAndId.approved === false) {
      this.props.refundEmployee(
        statusAndId.employee_id,
        statusAndId.pointsSpent
      );
    }
  };

  render() {
    return (
      <Container fluid className="allContainer">
        <div className="text-center">
          <h2 className="font-weight-bold   text-center my-3">
            Welcome{" "}
            {this.props.finance.finance
              ? this.props.finance.finance.finance_firstName
              : JSON.parse(sessionStorage.getItem("finance")) !== null
              ? JSON.parse(sessionStorage.getItem("finance"))
              : ""}
            !
          </h2>
          <h4 className="font-weight-bold   text-center my-3">
            Pending orders:
            {this.state.orders && this.state.orders.length
              ? this.state.orders.length
              : ""}
          </h4>
        </div>

        <Container className="whiteBackground my-5">
          <React.Fragment>
            <TransitionGroup>
              {this.props.order.loading === false ? (
                <React.Fragment>
                  {this.props.order.orders.map(
                    ({
                      _id,
                      order_for,
                      order_price,
                      employee_id,
                      order_date
                    }) => (
                      <Row className="my-5 defaultBackground tenPxMargin">
                        <Col xs="3 greyME2">
                          <div className="mt-2">
                            <h5 className=" font-weight-bold">
                              Date of order:
                              {new Date(order_date).toDateString()}
                            </h5>
                          </div>
                        </Col>

                        <Col xs="2 greyME2">
                          <div className="my-4">
                            <h6 className=" font-weight-bold">
                              Order for:{order_for}
                            </h6>
                          </div>
                        </Col>

                        <Col xs="2 greyME2">
                          <div className="my-4">
                            <h6 className=" font-weight-bold">
                              Order point cost:{order_price}
                            </h6>
                          </div>
                        </Col>
                        <Col xs="2 greyME2 text-center">
                          <div className="my-4 text-center">
                            <h6 className=" font-weight-bold text-center">
                              Ordered by employee:{"    "}
                              <Button
                                color="primary"
                                block
                                onClick={this.employeeDetails.bind(
                                  this,
                                  employee_id
                                )}
                              >
                                View
                              </Button>
                            </h6>
                          </div>
                        </Col>
                        <Col xs="3 greyME2 text-center approveOrReject">
                          <Button
                            className="my-4"
                            color="success"
                            block
                            size="sm"
                            onClick={this.approveOrRejectOrder.bind(this, {
                              approved: true,
                              _id: _id,
                              pointsSpent: order_price,
                              employee_id: employee_id
                            })}
                          >
                            Approve
                          </Button>
                          <Button
                            className="my-4"
                            color="danger"
                            block
                            size="sm"
                            onClick={this.approveOrRejectOrder.bind(this, {
                              approved: false,
                              _id: _id,
                              pointsSpent: order_price,
                              employee_id: employee_id
                            })}
                          >
                            Reject
                          </Button>
                        </Col>
                      </Row>
                    )
                  )}
                </React.Fragment>
              ) : (
                <div className="text-center">
                  <h5 className="greyME font-weight-bold">
                    Try refreshing this page if it does not refresh automaticaly
                  </h5>
                  <div className=" loadbody my-5" />
                </div>
              )}
            </TransitionGroup>
          </React.Fragment>
        </Container>

        <Modal
          size="lg"
          isOpen={this.state.employeeModal}
          toggle={this.employeeModaltoggle}
        >
          <ModalHeader toggle={this.employeeModaltoggle}>
            {this.state.employee && this.state.employee._id ? (
              <Row>
                <Col xs="3" className="">
                  <h5 className=" border">
                    Employee name:
                    {this.state.employee.employee_firstName +
                      " " +
                      this.state.employee.employee_lastName}
                  </h5>
                </Col>

                <Col xs="3">
                  <h5 className="break">
                    Employee ID:
                    {this.state.employee._id}
                  </h5>
                </Col>

                <Col xs="3">
                  <h5>
                    Employee seniority:
                    {this.state.employee.employee_seniority}
                  </h5>
                </Col>

                <Col xs="3">
                  <h5>
                    Employee tenure:
                    {this.monthDiff(this.state.employee.employee_joinDate)}{" "}
                    months
                  </h5>
                </Col>
              </Row>
            ) : (
              <div>Nothing to show</div>
            )}
          </ModalHeader>
        </Modal>
      </Container>
    );
  }
}

FinanceLanding.propTypes = {
  getOrdersNotReviewed: PropTypes.func.isRequired,
  updateOrderApproval: PropTypes.func.isRequired,
  refundEmployee: PropTypes.func.isRequired,
  getEmployee: PropTypes.func.isRequired,
  finance: PropTypes.object,
  order: PropTypes.object,
  employee: PropTypes.object
};

const mapStateToProps = state => ({
  order: state.order,
  finance: state.finance,
  employee: state.employee
});
export default connect(
  mapStateToProps,
  { getOrdersNotReviewed, updateOrderApproval, getEmployee, refundEmployee }
)(FinanceLanding);
