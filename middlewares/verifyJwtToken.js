const base_response=require('../utils/baseResponse').response
const jwt=require('jsonwebtoken')

exports.validateToken=async (req, res, next) => {
    try {
      // console.log(req)
      const secret = process.env.JWT_SECRET;
      const { authorization } = req.headers;
      const tokenArray = authorization.split(" ");
      console.log(tokenArray)
      jwt.verify(tokenArray[1], secret, (err, data) => {
        if (err) {
          res.status(403).json(base_response(403, {}, "Unauthorized"));
        } else {
          req.login = data;
        
          console.log("here the data",data);
          console.log(req.login);
          if (data) {
            next();
          } else {
            res.status(402).json(base_response(403, {}, "Please ReLogin"));
          }
        }
      });
    } catch (error) {
      res.status(402).json(base_response(403, {}, "Wrong Bearer Token"));
    }
  }
