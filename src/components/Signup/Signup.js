/* eslint-disable */
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from "react-bootstrap";
import * as styles from "./Signup.module.css";
import postSignup from "../../services/postSignup";

const Signup = () => {
  const SECRET_TOKEN = "jsfac";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();

  const onChangeUsername = e => {
    setUsername(e.target.value);
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onSignupClick = async () => {
    try {
      const body = {
        name: username,
        email: email,
        password: password,
        secret: SECRET_TOKEN
      }
      console.log("Calling postSignup with body: ", JSON.stringify(body))
      const messageData = await postSignup(body);
      console.log("Response received: ", messageData);

      if (messageData.message == "user created, try to login") {
        history.push('/login');
      } else {
        setErrorMsg(messageData.message);
      }

    } catch (e) {
      console.log(e);
    }

  };

  return (
    <Container>
      <Row className={styles.signup__container}>
        <Col md="5">
          <div className={styles.signup__innerContainer}>
            <h1 className={styles.signup__header}>SIGN UP</h1>
            <Form>
              <div className={styles.signup__label}>
                <Form.Group controlId="usernameId">
                  <Form.Label data-testid="name_label">User name</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter user name"
                    value={username}
                    onChange={onChangeUsername}
                    data-testid="name_input"
                  />
                  <FormControl.Feedback type="invalid"></FormControl.Feedback>
                </Form.Group>

                <Form.Group controlId="emailId">
                  <Form.Label data-testid="email_label">User email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Enter user email"
                    value={email}
                    onChange={onChangeEmail}
                    data-testid="email_input"
                  />
                  <FormControl.Feedback type="invalid"></FormControl.Feedback>
                </Form.Group>

                <Form.Group controlId="passwordId">
                  <Form.Label data-testid="password_label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter a password"
                    value={password}
                    onChange={onChangePassword}
                    data-testid="password_input"
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
              </div>
            </Form>
            <Button
              className={styles.signup__button}
              color="primary"
              onClick={onSignupClick}
              data-testid="submit_button">
              Signup
            </Button>
            <p className="mt-2" style={{ margin: "0px" }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
            <div className={styles.signup__error}  data-testid="error_message">
              {errorMsg}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;