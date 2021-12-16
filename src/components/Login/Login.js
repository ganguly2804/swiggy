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
import * as styles from "./Login.module.css";
import { storeCredentials, storeData, setUserDetails } from "../../redux/Ordering/ordering-actions";
 
const Login = ({ storeCredentials, storeData, setUserDetails }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
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
 
  const onLoginClick = () => {
    console.log(username, " ", password);
    if (username != "" && password != "") {
      const dataValues = JSON.parse(localStorage.getItem(username));
      if (dataValues != null) {
        const actualPassword = dataValues.credentials.password;
        if (password == actualPassword) {
          setUserDetails(dataValues);
          history.push('/');
        } else {
          setErrorMsg("Incorrect password");
        }
      } else {
        setErrorMsg("Incorrect Username");
      }
    } else {
      setErrorMsg("Please fill out both fields");
    }
  };
 
  return (
    <Container>
      <Row className={styles.login__container}>
        <Col md="5">
          <div className={styles.login__innerContainer}>
            <h1 className={styles.login__header}>LOG IN</h1>
            <Form>
              <div className={styles.login__label}>
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
 
              <div className={styles.login__label}>
                <Form.Group controlId="passwordId" className={styles.login__label}>
                  <Form.Label>Your password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={onChangePassword}
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
              </div>
            </Form>
            <Button className={styles.login__button} color="primary" onClick={onLoginClick}>Login</Button>
            <p className="mt-2" style={{marginBottom: "0px"}}>
              Don't have account? <Link to="/signup">Signup</Link>
            </p>
            <div className={styles.login__error}>
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
 
export default connect(null, mapDispatchToProps)(Login);