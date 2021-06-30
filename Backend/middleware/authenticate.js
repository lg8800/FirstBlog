const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    /* 
        req: {
          header: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ezygfhwoefhiqfqw4230_32u420f....'
          }, 
          body: {

          }, 
          ....
        }
    */
      
    const header = req.get("Authorization");

    if (!header) {
      const error = new Error("Not Authorized!");
      error.statusCode = 401;
      throw error;
    }

    const token = header.split(" ")[1];
    console.log("token : ", token);
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      console.log("invalid token");
      error.statusCode = 500;
      throw error;
    }
    console.log("decodedToken", decodedToken);

    if (!decodedToken) {
      const error = new Error("Not authorized");
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).send("Unauthorized");
  }
};

module.exports = authenticate;
  