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

class AdminLanding extends Component {
  componentWillMount() {
    this.props.getOrdersNotReviewed("admin");
    if (this.props.order.orders && this.props.order.orders.length) {
      this.setState({ orders: this.props.order.orders });
    } else if (JSON.parse(sessionStorage.getItem("orders")) !== null) {
      this.setState({ orders: JSON.parse(sessionStorage.getItem("orders")) });
    }

    console.log("this.props==>>", this.props);
    console.log(
      "admin loggedin==>>",
      JSON.parse(sessionStorage.getItem("admin"))
    );
    console.log(
      "orders saved==>>",
      JSON.parse(sessionStorage.getItem("orders"))
    );

    const currentAdmin = JSON.parse(sessionStorage.getItem("admin"));
    currentAdmin
      ? this.setState({ admin: currentAdmin })
      : this.setState({ admin: {} });
  }

  componentWillReceiveProps() {
    if (this.props.order.orders && this.props.order.orders.length) {
      let currentOrders = this.props.order.orders
        ? this.props.order.orders
        : JSON.parse(sessionStorage.getItem("orders")) !== null
        ? JSON.parse(sessionStorage.getItem("orders"))
        : [];
      let currentAdmin = this.props.admin.admin
        ? this.props.admin.admin.admin_firstName
        : JSON.parse(sessionStorage.getItem("admin")) !== null
        ? JSON.parse(sessionStorage.getItem("admin"))
        : "";
      this.setState({
        orders: currentOrders,
        admin: currentAdmin
      });
    }
  }

  state = {
    employee: {},
    admin: {},
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
    let adminId = JSON.parse(sessionStorage.getItem("admin"))._id;
    let order = {
      admin_viewed_by: adminId,
      admin_approval_status: statusAndId.approved,
      _id: statusAndId._id
    };

    console.log("Order being updated", order);
    this.props.updateOrderApproval("admin", order);

    setTimeout(() => {
      if (this.props.order.orders && this.props.order.orders.length) {
        let currentOrders = this.props.order.orders
          ? this.props.order.orders
          : JSON.parse(sessionStorage.getItem("orders")) !== null
          ? JSON.parse(sessionStorage.getItem("orders"))
          : [];
        let currentAdmin = this.props.admin.admin
          ? this.props.admin.admin.admin_firstName
          : JSON.parse(sessionStorage.getItem("admin")) !== null
          ? JSON.parse(sessionStorage.getItem("admin"))
          : "";
        this.setState({
          orders: currentOrders,
          admin: currentAdmin
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
            {this.props.admin.admin
              ? this.props.admin.admin.admin_firstName
              : JSON.parse(sessionStorage.getItem("admin")) !== null
              ? JSON.parse(sessionStorage.getItem("admin"))
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

AdminLanding.propTypes = {
  getOrdersNotReviewed: PropTypes.func.isRequired,
  updateOrderApproval: PropTypes.func.isRequired,
  refundEmployee: PropTypes.func.isRequired,
  getEmployee: PropTypes.func.isRequired,
  admin: PropTypes.object,
  order: PropTypes.object,
  employee: PropTypes.object
};

const mapStateToProps = state => ({
  order: state.order,
  admin: state.admin,
  employee: state.employee
});
export default connect(
  mapStateToProps,
  { getOrdersNotReviewed, updateOrderApproval, getEmployee, refundEmployee }
)(AdminLanding);
