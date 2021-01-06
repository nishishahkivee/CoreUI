const jwt = require('jsonwebtoken');
const config = require('config');
const { response } = require('express');
const User = require('../models/user')
const tokenExpirePeriod = config.get('JWT_LIFETIME');
const jwtSecret = config.get('JWT_SECRET');

async function generateToken(payLoad, expiresIn = tokenExpirePeriod) {
  const isObject = (typeof payLoad === 'object');

  if (!payLoad) {
    const error = new TypeError('Token Payload Should Not Be Empty');
    throw error;
  }

  if (!isObject) {
    const error = new TypeError('Token Payload Must Be An Object');
    throw error;
  }

  return new Promise((resolve, reject) => {
    jwt.sign(payLoad, jwtSecret, { expiresIn }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}
  async function verifyToken(token) {  
  if (!token) {
    const error = new TypeError('Token Should Not Be Empty');
    throw error;
  }

   const mypromise =  new Promise((resolve, reject) => {    
    jwt.verify(token, jwtSecret, (error, decodedToken) => {      
      if (error) {
        console.log(error);
        reject(error);
      } else {       
        const token1 = jwt.decode()
        console.log(decodedToken);
        console.log(decodedToken.userId);  
        find(decodedToken.userId);       
          console.log("dfgseg");
    }
  });
});
}         
async function find(uid){
User.findById(uid)
    .then(user => {
            if (user) {
              console.log(user);
              return  user;            
            }
            console.log("dgfg");
            return false;
          })
          .catch(err => {
            console.log("sdf");
            return false;
          })
        }    


module.exports = {
  generate: generateToken,
  verify: verifyToken,
};
