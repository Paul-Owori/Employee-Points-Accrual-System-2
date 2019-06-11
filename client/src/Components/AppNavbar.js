import React, { Component } from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import "./css/css_for_all.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Button
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { employeeLogout } from "../Actions/employeeActions";
import { adminLogout } from "../Actions/adminActions";
import { financeLogout } from "../Actions/financeActions";
import {
  addOrders,
  deletePreOrder,
  getOrdersEmployee
} from "../Actions/orderActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AppNavbar extends Component {
  state = {
    employee: {},
    admin: {},
    finance: {},
    orders: [],
    pre_orders: [],
    cart: [],
    loggedIn: "",
    isOpen: false,
    modal: false,
    fav_modal: false
  };
  componentDidMount() {
    let currentEmployee = JSON.parse(sessionStorage.getItem("employee"));
    if (currentEmployee && currentEmployee._id) {
      this.props.getOrdersEmployee(currentEmployee._id);
    }

    this.setState({
      employee: sessionStorage.getItem("employee")
        ? JSON.parse(sessionStorage.getItem("employee"))
        : "",
      admin: sessionStorage.getItem("admin")
        ? JSON.parse(sessionStorage.getItem("admin"))
        : "",
      finance: sessionStorage.getItem("finance")
        ? JSON.parse(sessionStorage.getItem("finance"))
        : "",
      cart: sessionStorage.getItem("cart")
        ? JSON.parse(sessionStorage.getItem("cart"))
        : [],
      pre_orders:
        this.props.pre_orders && this.props.pre_orders.length
          ? this.props.pre_orders
          : JSON.parse(sessionStorage.getItem("cart")),
      loggedIn:
        sessionStorage.getItem("employee") === null &&
        sessionStorage.getItem("admin") === null &&
        sessionStorage.getItem("finance") === null
          ? false
          : true,
      orders: sessionStorage.getItem("orders")
        ? JSON.parse(sessionStorage.getItem("orders"))
        : [],
      cartColor: "fas fa-shopping-cart  fa-lg",

      fav_color: "fas fa-heart fa-lg"
    });
  }

  componentWillReceiveProps() {
    this.setState({
      employee: sessionStorage.getItem("employee")
        ? JSON.parse(sessionStorage.getItem("employee"))
        : "",
      admin: sessionStorage.getItem("admin")
        ? JSON.parse(sessionStorage.getItem("admin"))
        : "",
      cart: sessionStorage.getItem("cart")
        ? JSON.parse(sessionStorage.getItem("cart"))
        : [],
      pre_orders:
        this.props.pre_orders && this.props.pre_orders.length
          ? this.props.pre_orders
          : JSON.parse(sessionStorage.getItem("cart")),
      loggedIn: sessionStorage.getItem("employee") === null ? false : true,
      orders:
        this.props.order.orders && this.props.order.orders.length
          ? this.props.order.orders
          : sessionStorage.getItem("orders")
          ? JSON.parse(sessionStorage.getItem("orders"))
          : []
    });
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  modalToggle = () => {
    setTimeout(() => {
      this.setState({ modal: !this.state.modal });
    }, 50);
  };

  fav_modalToggle = () => {
    setTimeout(() => {
      this.setState({ fav_modal: !this.state.fav_modal });
    }, 50);
  };

  logOut = () => {
    this.props.employeeLogout();
    this.props.adminLogout();
    this.props.financeLogout();

    const user = sessionStorage.getItem("user");
    const finance = sessionStorage.getItem("finance");
    const admin = sessionStorage.getItem("admin");
    const cart = sessionStorage.getItem("cart");
    const orders = sessionStorage.getItem("orders");

    setTimeout(() => {
      if (user) {
        sessionStorage.removeItem("user");
      }
      if (admin) {
        sessionStorage.removeItem("admin");
      }
      if (finance) {
        sessionStorage.removeItem("finance");
      }
      if (cart) {
        sessionStorage.removeItem("cart");
      }
      if (orders) {
        sessionStorage.removeItem("orders");
      }
    }, 50);

    this.setState({ user: "", admin: "", finance: "" });
  };

  signIn = () => {
    this.setState({});
  };

  orderCheckout = orders => {
    this.props.addOrders(orders);
    console.log("ORDERS RECEIVED ==>>", orders);

    setTimeout(() => {
      orders.forEach(order => {
        this.props.deletePreOrder(order.employee_id);
      });
      this.setState({ orders: this.props.order.orders });
    }, 380);
  };

  deleteCartItem(employee_id) {
    this.props.deletePreOrder(employee_id);
  }

  //   order.employee_id = req.body.employee_id;
  //   order.order_for = req.body.order_for;
  //   order.order_price = req.body.order_price;

  toGithub = () => {
    window.open(
      "https://github.com/Paul-Owori/Employee-Points-Accrual-System-2",
      "_self"
    );
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5 fixed-top">
          <NavbarBrand>
            <Link to="/" className="greyME2">
              Employee Benefits
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />

          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink />
              </NavItem>
              {(sessionStorage.getItem("employee") === null &&
              sessionStorage.getItem("admin") === null &&
              sessionStorage.getItem("finance") === null ? (
                false
              ) : (
                true
              )) ? (
                <NavItem>
                  <NavLink>
                    <RouterNavLink
                      to="/"
                      onClick={this.logOut}
                      className="greyME2"
                    >
                      Logout
                    </RouterNavLink>
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem>
                  <NavLink>
                    <RouterNavLink to="/" className="greyME2">
                      Signin / Signup
                    </RouterNavLink>
                  </NavLink>
                </NavItem>
              )}

              <NavItem>
                {this.state.user || this.state.admin ? (
                  ""
                ) : (
                  <NavLink>
                    <RouterNavLink to="/admin" className="greyME2">
                      Admin
                    </RouterNavLink>
                  </NavLink>
                )}
              </NavItem>
              {sessionStorage.getItem("employee") === null ? (
                ""
              ) : (
                <NavItem>
                  <NavLink>
                    <i
                      className="fas fa-shopping-cart cart"
                      onClick={this.modalToggle}
                    />
                    <small>
                      {this.state.pre_orders
                        ? this.state.pre_orders.length
                        : sessionStorage.getItem("cart")
                        ? JSON.parse(sessionStorage.getItem("cart")).length
                        : 0}
                    </small>
                  </NavLink>
                </NavItem>
              )}
              {sessionStorage.getItem("employee") === null ? (
                ""
              ) : (
                <NavItem>
                  <NavLink>
                    <i
                      className={this.state.fav_color}
                      onClick={this.fav_modalToggle}
                    />
                    <small>{this.state.orders.length}</small>
                  </NavLink>
                </NavItem>
              )}

              <NavItem>
                <NavLink>
                  <RouterNavLink className="greyME2" onClick={this.toGithub}>
                    GitHub-Repo
                  </RouterNavLink>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Modal isOpen={this.state.modal} toggle={this.modalToggle} size="lg">
          <ModalHeader toggle={this.modalToggle}>
            {this.state.employee
              ? this.state.employee.employee_firstName + "'s "
              : ""}
            Benefits Cart
          </ModalHeader>
          <ModalBody>
            <TransitionGroup>
              {this.state.cart &&
              this.state.cart.length &&
              sessionStorage.getItem("cart") !== null ? (
                this.state.cart.map(
                  ({ order_for, order_price, employee_id }) => (
                    <CSSTransition
                      key={employee_id}
                      timeout={500}
                      classNames="fade"
                    >
                      <Row className="mb-3">
                        <Col xs="4">
                          <h5>Order for: {order_for}</h5>
                        </Col>
                        <Col xs="4">
                          <h6>Points spent: {order_price}</h6>
                        </Col>
                        <Col xs="2">
                          <Button
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick={this.deleteCartItem.bind(
                              this,
                              employee_id
                            )}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </CSSTransition>
                  )
                )
              ) : (
                <p>You haven't added anything to your cart yet</p>
              )}
            </TransitionGroup>
            <Button
              onClick={
                sessionStorage.getItem("cart")
                  ? this.orderCheckout.bind(
                      this,
                      JSON.parse(sessionStorage.getItem("cart"))
                    )
                  : console.log("Error")
              }
              className="checkout"
              color="dark"
              size="block"
            >
              Check out cart
            </Button>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.fav_modal}
          toggle={this.fav_modalToggle}
          size="lg"
        >
          <ModalHeader toggle={this.fav_modalToggle}>
            {this.state.employee
              ? this.state.employee.employee_firstName + "'s "
              : ""}
            Favourites
          </ModalHeader>
          <ModalBody>
            <TransitionGroup className="shopping-list">
              {this.state.orders && this.state.orders.length ? (
                this.state.orders.map(
                  ({ _id, item_name, rentOrSale, item_price, date }) => (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <Row className="mb-3">
                        <Col xs="3">
                          <h5>{item_name}</h5>
                        </Col>
                        <Col xs="3">
                          <h6>Ordered on {date}</h6>
                        </Col>
                        <Col xs="2">
                          <h6>UGX {item_price}</h6>
                        </Col>
                        <Col xs="2">
                          <h6 className="font-weight-bold">{rentOrSale}</h6>
                        </Col>
                        <Col xs="2" />
                      </Row>
                    </CSSTransition>
                  )
                )
              ) : (
                <p>You haven't made any orders yet</p>
              )}
            </TransitionGroup>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  employeeLogout: PropTypes.func.isRequired,
  financeLogout: PropTypes.object.isRequired,
  adminLogout: PropTypes.object.isRequired,
  employee: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  deletePreOrder: PropTypes.func.isRequired,
  addOrders: PropTypes.func.isRequired,
  pre_orders: PropTypes.object.isRequired,
  getOrdersUser: PropTypes.func.isRequired,
  buyItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  employee: state.employee,
  admin: state.admin,
  order: state.order,
  item: state.item
});
export default connect(
  mapStateToProps,
  {
    employeeLogout,
    adminLogout,
    financeLogout,
    addOrders,
    deletePreOrder,
    getOrdersEmployee
  }
)(AppNavbar);
