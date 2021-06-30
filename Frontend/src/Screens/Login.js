import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../Redux/index";

const Login = (props) => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.ath.token);
  const userId = useSelector(state => state.ath.userId);

  const redirectToApp = () => {
    props.history.push("/");
  };

  useEffect(() => {
    if(token && userId) {
      redirectToApp();
    }
  }, [token, userId]);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    console.log('logging in : ', email, password);
    dispatch(actions.loginUser(email, password))
      .then((result) => {
        redirectToApp();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div
        style={{
          alignSelf: "center",
          background: "#eeeeee",
          marginBottom: "25%",
          marginTop: "5%",
          marginLeft: "25%",
          marginRight: "25%",
          padding: "5%",
        }}
      >
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          Login
        </h2>
        <Form method="POST">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="outline-success" type="submit" onClick={loginUser}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(Login);
