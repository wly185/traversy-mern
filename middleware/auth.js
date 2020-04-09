const jwt = require('jsonwebtoken');
const config = require('config');
const axios = require('../client/node_modules/axios');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // const token = req.data.token;

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.log(JSON.stringify(err));
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
