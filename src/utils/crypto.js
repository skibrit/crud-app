const jwt = require("jsonwebtoken");

const signToken = async (payload, secret, duration) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.sign(payload, secret, { expiresIn: duration }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    } catch (err) {
      reject(err);
    }
  });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  signToken,
  verifyToken
};
