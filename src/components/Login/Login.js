/* eslint-disable */
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from "react-bootstrap";
import * as styles from "./Login.module.css";
import postLogin from "../../services/postLogin";
import { storeCredentials, storeData, setUserDetails } from "../../redux/Ordering/ordering-actions";

const Login = ({ storeCredentials, storeData, setUserDetails }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onLoginClick = async () => {
    try {
      const body = {
        email: email,
        password: password
      };
      console.log("Calling postLogin with body: ", JSON.stringify(body));
      const tokenData = await postLogin(body);
      console.log("Response received: ", tokenData);

      if ("token" in tokenData) {
        const credentials = {
          ...body,
          name: tokenData.name,
          token: tokenData.token,
        };
        // Update store state with valid credentials
        storeCredentials(credentials);
        history.push('/');
      } else {
        setErrorMsg(tokenData.message);
      };

    } catch (e) {
      console.log(e);
    };
  };

  return (
    <Container>
      <Row className={styles.login__container}>
        <Col md="5">
          <div className={styles.login__innerContainer}>
            <h1 className={styles.login__header}>LOG IN</h1>
            <Form>
              <div className={styles.login__label}>
                <Form.Group controlId="emailId">
                  <Form.Label data-testid="email_label">Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={onChangeEmail}
                    data-testid="email_input"
                  />
                  <FormControl.Feedback type="invalid"></FormControl.Feedback>
                </Form.Group>
              </div>

              <div className={styles.login__label}>
                <Form.Group controlId="passwordId" className={styles.login__label}>
                  <Form.Label data-testid="password_label">Your password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={onChangePassword}
                    data-testid="password_input"
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
              </div>
            </Form>
            <Button
              className={styles.login__button}
              color="primary"
              onClick={onLoginClick}
              data-testid="submit_button">
              Login
            </Button>
            <p className="mt-2" style={{ marginBottom: "0px" }}>
              Don't have account? <Link to="/signup">Signup</Link>
            </p>
            <div className={styles.login__error} data-testid="error_message">
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