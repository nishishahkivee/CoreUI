const User = require("../app/models/user");
const { Strategy } = require("passport-jwt");
const { JWT_SECRET } = require('../config/default')
const { ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};
module.exports = passport => {  
  passport.use(
    new Strategy(opts, async (payload, done) => {     
      await User.findById(payload.userId)
        .then(user => {
          if (user) {            
            return done(null, user);
          }          
          return done(null, false);
        })
        .catch(err => {          
          return done(null, false);
        });
    })
  );
};