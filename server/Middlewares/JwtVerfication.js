const jwt = require("jsonwebtoken");
const jwtverification = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).send({ msg: "Unauthorized Jwt Tokken" });
  } else {
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(verify);
      req.authorizedUser = verify.userId
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = jwtverification;
