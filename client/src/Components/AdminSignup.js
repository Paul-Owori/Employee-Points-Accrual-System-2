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
import { signInAdmin, addAdmin } from "../Actions/adminActions"; //REQUIRED FOR REDUX
import PropTypes from "prop-types";

class AdminSignUp extends Component {
  state = {
    loading: false,
    firstName: "",
    lastName: "",
    signUpEmail: "",

    signUpPassword1: "",
    signUpPassword2: "",
    signInEmail: "",
    signInPassword: "",
    admin: "",
    warnModalText: "",
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
        const newAdmin = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.signUpEmail,
          password: this.state.signUpPassword2
        };

        this.props.addAdmin(newAdmin);
        this.setState({
          firstName: "",
          lastName: "",
          signUpEmail: "",
          signUpPassword2: "",
          signUpPassword1: ""
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

    const signInAdmin = {
      email: this.state.signInEmail,
      password: this.state.signInPassword
    };
    this.props.signInAdmin(signInAdmin);
    setTimeout(() => {
      if (this.props.admin.admin && this.props.admin.admin.admin_firstName) {
        this.props.history.push("/admin/landing");
      } else {
        this.setState({ warnModalText: "Login Error! Please try again" });
        setTimeout(() => {
          if (
            this.props.admin.admin &&
            this.props.admin.admin.admin_firstName
          ) {
            this.props.history.push("/admin/landing");
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
                Admin Sign-In
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
                Admin Sign-Up
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

AdminSignUp.propTypes = {
  addAdmin: PropTypes.func.isRequired,
  signInAdmin: PropTypes.func.isRequired,
  admins: PropTypes.array.isRequired,
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});
export default connect(
  mapStateToProps,
  { addAdmin, signInAdmin }
)(AdminSignUp);
