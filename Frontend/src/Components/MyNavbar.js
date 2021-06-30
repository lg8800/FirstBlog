import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const MyNavbar = () => {
  const token = useSelector((state) => state.ath.token);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top"
        style={{ borderBottom: "0.5px solid #ccc", backgroundColor: "#fff" }}
      >
        <Navbar.Brand href="/" style={{ color: "#000" }}>
          BlogFirst
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {isAuth && (
              <NavLink
                to="/"
                style={{
                  marginRight: "40px",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                Home
              </NavLink>
            )}
            {isAuth && (
              <NavLink
                to="/blog"
                style={{
                  marginRight: "40px",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                Blog
              </NavLink>
            )}
            {isAuth && (
              <NavLink
                to="/profile"
                style={{
                  marginRight: "40px",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                Profile
              </NavLink>
            )}
            {!isAuth && (
              <NavLink
                to="/login"
                style={{
                  marginRight: "40px",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                Login
              </NavLink>
            )}
            {!isAuth && (
              <NavLink
                to="/signup"
                style={{
                  marginRight: "40px",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                Sign Up
              </NavLink>
            )}
            {isAuth && (
              <NavLink
                to="/logout"
                style={{
                  marginRight: "40px",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                Logout
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MyNavbar;