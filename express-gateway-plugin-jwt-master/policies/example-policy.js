var jwt = require('jsonwebtoken');

module.exports = {
  name: 'jwt',
  policy: (actionParams) => {
    return (req, res, next) => {
      let authorizationHeader = req.headers.authorization;
      let result;
      if (authorizationHeader) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        try {
          // verify makes sure that the token hasn't expired and has been issued by us
          result = jwt.verify(token, actionParams.secret);
          // Let's pass back the decoded token to the request object
          req.decoded = result;
          // let tokenUser = await apiServices.getUserbyToken(token);
          if (result) {
            // if (authorizedRoles.indexOf(tokenUser.account.accounts_role.role_id) > -1) {
              next();
            // } else {
            //   return apiResponse.responseFormat(res, false, "Functionality Restricted", "", "", httpStatus.FORBIDDEN)
            // }
          } else {
            
            res.status(403).json({message: 'Invalid Token'}).end();
          }
          // We call next to pass execution to the subsequent middleware
        } catch (err) {
          // Throw an error just in case anything goes wrong with verification
          console.log(err)
          
          res.status(403).json({message: 'Invalid Token'}).end();
        }
      } else {
        res.status(403).json({message: 'Authentication error. Token required'}).end();
      }





    };
  }
};
