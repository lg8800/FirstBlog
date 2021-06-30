import React, { useState, useEffect } from "react"; 
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import * as actions from "../Redux/index";
import { useSelector, useDispatch } from "react-redux";

const Signup = (props) => {
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


  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    dispatch(actions.signupUser(user))
      .then((result) => {
        props.history.push("/");
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
          Sign Up
        </h2>
        <Form method="POST">
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter your name"
              value={user.name}
              onChange={handleInputs}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={user.email}
              onChange={handleInputs}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="phone"
              type="number"
              placeholder="Phone Number"
              value={user.phone}
              onChange={handleInputs}
            />
          </Form.Group>
          <Form.Group controlId="formBasicWork">
            <Form.Label>Profession</Form.Label>
            <Form.Control
              name="work"
              type="text"
              placeholder="Enter your profession"
              value={user.work}
              onChange={handleInputs}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInputs}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              value={user.cpassword}
              onChange={handleInputs}
            />
          </Form.Group>
          <Button variant="outline-success" type="submit" onClick={PostData}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(Signup);
