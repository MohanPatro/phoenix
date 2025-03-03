const base_response=require('../utils/baseResponse').response


exports.generatejwttoken= async (data, res)=>{
    const secret = process.env.JWT_SECRET;
    return new Promise((resolve, reject) => {
      jwt.sign(
        data,
        secret,
        { expiresIn: "30 days" },
        (err, token) => {
          if (err) {
            return resolve(
              res
                .status(200)
                .json(base_response(400, {}, "Token not generated"))
            );
          }
          return resolve(token);
        }
      );
    });
  }