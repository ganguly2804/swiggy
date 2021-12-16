/* eslint-disable */
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from "react-bootstrap";
import * as styles from "./Signup.module.css";
import { storeCredentials, storeData, setUserDetails } from "../../redux/Ordering/ordering-actions";
 
const Signup = ({ storeCredentials, storeData, setUserDetails }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
 
  const [errorMsg, setErrorMsg] = useState("");
 
  const history = useHistory();
 
  const getToken = async () => {
    try {
      const body = {
        username: username,
        password: password
      }
      await axios
        .post('https://reqres.in/api/articles', { body })
        .then(response => {
          console.log("Response received: ", response.data);
          const credentials = {
            username: username,
            password: password,
            token: response.data.id
          };
          storeCredentials(credentials);
          storeData();
        });
    } catch (e) {
      console.log(e);
    }
  }
 
  const onChangeUsername = e => {
    setUsername(e.target.value);
  };
 
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
 
  const onChangePasswordRepeat = e => {
    setPasswordRepeat(e.target.value);
  };
 
  const onSignupClick = () => {
    console.log(username, " ", password);
    if (username != "" && password != "" && password != "") {
      const dataValues = JSON.parse(localStorage.getItem(username));
      if (dataValues == null) {
        if (password.length > 2) {
          if (password == passwordRepeat) {
            getToken();
            history.push('/');
          } else {
            setErrorMsg("Passwords do not match");
          }
        } else {
          setErrorMsg("Password should have more than 2 characters");
        }
      } else {
        setErrorMsg("Username already exists");
      }
    } else {
      setErrorMsg("Please fill out all fields");
    }
  };
 
  return (
    <Container>
      <Row className={styles.signup__container}>
        <Col md="5">
          <div className={styles.signup__innerContainer}>
            <h1 className={styles.signup__header}>SIGN UP  </h1>
            <Form>
              <div className={styles.signup__label}>
                <Form.Group controlId="usernameId">
                  <Form.Label>User name</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter user name"
                    value={username}
                    onChange={onChangeUsername}
                  />
                  <FormControl.Feedback type="invalid"></FormControl.Feedback>
                </Form.Group>
              </div>
 
              <div className={styles.signup__label}>
                <Form.Group controlId="passwordId" className={styles.signup__label}>
                  <Form.Label>Your new password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter a password"
                    value={password}
                    onChange={onChangePassword}
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="passwordId" className={styles.signup__label}>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Re-enter password"
                    value={passwordRepeat}
                    onChange={onChangePasswordRepeat}
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
              </div>
            </Form>
            <Button className={styles.signup__button} color="primary" onClick={onSignupClick}>Signup</Button>
            <p className="mt-2" style={{ margin: "0px" }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
            <div className={styles.signup__error}>
              {errorMsg}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
 
const mapDispatchToProps = (dispatch) => {
  return {
    storeCredentials: (item) => dispatch(storeCredentials(item)),
    storeData: () => dispatch(storeData()),
    setUserDetails: (item) => dispatch(setUserDetails(item))
  };
};
 
export default connect(null, mapDispatchToProps)(Signup);