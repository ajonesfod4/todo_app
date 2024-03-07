const jwt = require("jsonwebtoken");

//* ############### middleware ###############
//Verifies if a users token is active
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.json({
      auth: false,
      message: "No token",
    });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          message: err,
        });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports = verifyJWT;
