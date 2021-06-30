import React, { useEffect } from "react";
import MyNavbar from "./Components/MyNavbar";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile";
import Blog from "./Screens/Blog";
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import Logout from "./Screens/Logout";
import { Route } from "react-router-dom";
import * as actions from './Redux/index';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if(token && userId) {
      dispatch(actions.autoLogin(token, userId));
    }
  }, [dispatch, token, userId]);

  return (
    <>
      <MyNavbar />
      <div style={{ marginTop: 100 }}>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route exact path="/blog/:blogId">
          <Blog />
        </Route>
      </div>
    </>
  );
};

export default App;
