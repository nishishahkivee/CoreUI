'use strict';

module.exports = {
  DB_URL: process.env.MONGO_DB_URI,

  // JWT Secret
  JWT_SECRET: (process.env.JWT_SECRET || 'test-jwt-secret'),
  JWT_LIFETIME: (60 * 60 * 1), // 1 hour  
   "secret": "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
  
  PORT: process.env.PORT || 3000,
  IP: '0.0.0.0',
  
};
