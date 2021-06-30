import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import * as actions from "../Redux/index";
import { useDispatch } from "react-redux";

const Logout = (props) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(actions.logoutUser());
    props.history.push("/login");
  };

  const logoutCancel = () => {
    props.history.push("/profile");
  };

  return (
    <div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 250,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
          width: 400,
        }}
      >
        Are you sure you want to logout ?
        <div
          style={{
            display: "flex",
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="danger"
            type="submit"
            style={{ width: 70 }}
            onClick={logoutHandler}
          >
            Yes
          </Button>
          <div style={{ width: 15 }}></div>
          <Button
            variant="outline-success"
            type="submit"
            style={{ width: 70 }}
            onClick={logoutCancel}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Logout);
