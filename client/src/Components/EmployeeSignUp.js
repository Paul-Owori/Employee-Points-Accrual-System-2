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

import { connect } from "react-redux"; //REQUIRED FOR REDUX
import { signInEmployee, addEmployee } from "../Actions/employeeActions"; //REQUIRED FOR REDUX
import PropTypes from "prop-types";

class EmployeeSignUp extends Component {
  state = {
    loading: false,
    firstName: "",
    lastName: "",
    signUpEmail: "",
    seniority: "",
    signUpPassword1: "",
    signUpPassword2: "",
    signInEmail: "",
    signInPassword: "",
    employee: "",
    warnModalText: "",
    joinDate: "",
    warnModal: false
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  onSignUp = e => {
    e.preventDefault();

    if (this.state.signUpPassword1 === this.state.signUpPassword2) {
      if (
        this.state.firstName &&
        this.state.lastName &&
        this.state.signUpEmail &&
        this.state.signUpPassword2
      ) {
        const newEmployee = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.signUpEmail,
          seniority: this.state.seniority,
          password: this.state.signUpPassword2,
          joinDate: this.state.joinDate
        };

        this.props.addEmployee(newEmployee);
        this.setState({
          firstName: "",
          lastName: "",
          signUpEmail: "",
          signUpPassword2: "",
          signUpPassword1: "",
          joinDate: ""
        });

        this.setState({
          warnModalText: "Success! You can try logging in now"
        });
        setTimeout(() => {
          this.warnModaltoggle();
        }, 100);
      } else {
        this.setState({
          warnModalText: "Make sure to fill in all fields before you submit"
        });
        setTimeout(() => {
          this.warnModaltoggle();
        }, 100);
      }
    } else {
      this.setState({ warnModalText: "Passwords do not match!" });
      setTimeout(() => {
        this.warnModaltoggle();
      }, 100);
    }
  };

  onSignIn = e => {
    e.preventDefault();

    const signInEmployee = {
      email: this.state.signInEmail,
      password: this.state.signInPassword
    };
    this.props.signInEmployee(signInEmployee);
    setTimeout(() => {
      if (
        this.props.employee.employee &&
        this.props.employee.employee.employee_firstName
      ) {
        this.props.history.push("/employee/landing");
      } else {
        this.setState({ warnModalText: "Login Error! Please try again" });
        setTimeout(() => {
          if (
            this.props.employee.employee &&
            this.props.employee.employee.employee_firstName
          ) {
            this.props.history.push("/employee/landing");
          } else {
            this.warnModaltoggle();
          }
        }, 150);
      }
    }, 300);
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
        <p>
          <h1 className="font-weight-bold colorME  text-center my-3">
            Welcome!
          </h1>
        </p>
        <Container className="text-center mb-5">
          <Row className="justify-content-center ">
            <Col md="4" className="px-lg-5 defaultBackground">
              <h3 className="font-weight-bold colorME  text-center my-3">
                Sign-In
              </h3>
              <Form className="text-center" onSubmit={this.onSignIn}>
                <FormGroup>
                  <Input
                    type="email"
                    className="form-control"
                    id="signInEmail"
                    name="signInEmail"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup className="mb-5 ">
                  <Input
                    type="password"
                    className="form-control"
                    id="signInPassword"
                    name="signInPassword"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <Button
                  color="light"
                  block
                  type="submit"
                  className="mb-3 align-bottom"
                >
                  SignIn
                </Button>
              </Form>
            </Col>
            <Col md="2">
              <h3 className="font-weight-bold colorME text-center my-3">OR</h3>
            </Col>
            <Col md="4" className="px-lg-5 defaultBackground">
              <h3 className="font-weight-bold colorME text-center my-3">
                Sign-Up
              </h3>
              <Form className="text-center" onSubmit={this.onSignUp}>
                <FormGroup>
                  <Input
                    type="name"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="name"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={this.state.lastName}
                    placeholder="Last Name"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="email"
                    className="form-control"
                    id="signUpEmail"
                    name="signUpEmail"
                    value={this.state.signUpEmail}
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="seniority"
                    className="form-control"
                    id="seniority"
                    name="seniority"
                    value={this.state.seniority}
                    placeholder="Seniority"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="joinDate"
                    className="form-control"
                    id="joinDate"
                    name="joinDate"
                    value={this.state.joinDate}
                    placeholder="When did you join? (MM/DD/YYYY)"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    className="form-control"
                    id="signUpPassword1"
                    name="signUpPassword1"
                    value={this.state.signUpPassword1}
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    className="form-control"
                    id="signUpPassword2"
                    name="signUpPassword2"
                    value={this.state.signUpPassword2}
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button type="submit" className="mt-5 mb-3" color="light" block>
                  SignUp
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={this.state.warnModal} toggle={this.warnModaltoggle}>
          <ModalHeader toggle={this.warnModaltoggle}>
            {this.state.warnModalText}
          </ModalHeader>
        </Modal>
      </Container>
    );
  }
}

EmployeeSignUp.propTypes = {
  addEmployee: PropTypes.func.isRequired,
  signInEmployee: PropTypes.func.isRequired,
  employees: PropTypes.array.isRequired,
  employee: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employee: state.employee
});
export default connect(
  mapStateToProps,
  { addEmployee, signInEmployee }
)(EmployeeSignUp);
