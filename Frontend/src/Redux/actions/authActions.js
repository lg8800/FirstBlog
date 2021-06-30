import * as ActionTypes from "../ActionTypes";
import axios from "axios";

export const autoLogin = (token, userId) => {
  return async dispatch => {
    dispatch(authSuccess({
      token,
      userId,
    }));
  }
}

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/signin", {
        email,
        password,
      });
      const data = response.data;
      console.log("login data : ", data);
      if (!data) {
        throw new Error("Login Unsuccessful");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      dispatch(authSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(authFail(error.message));
      throw error;
    }
  };
};

export const signupUser = (user) => {
  return async (dispatch) => {
    try {
      const { name, email, phone, work, password } = user;
      const signupBody = {
        name,
        email,
        phone,
        work,
        password,
      };
      const response = await axios.post(
        "http://localhost:5000/register",
        signupBody
      );

      const data = response.data;

      if (!data) {
        throw new Error("Signup Unsuccessful");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      dispatch(authSuccess(data));
    } catch (error) {
      dispatch(authFail(error.message));
      throw error;
    }
  };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: ActionTypes.LOGOUT_USER,
  };
};

const authSuccess = (authData) => {
  const { token, userId } = authData;
  return {
    type: ActionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

const authFail = (error) => {
  return {
    type: ActionTypes.AUTH_FAIL,
    error: error,
  };
};
