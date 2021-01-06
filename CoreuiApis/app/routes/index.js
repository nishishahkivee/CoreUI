'use strict';

const errorHandlingMiddleware = require('../lib/error-handling-middleware');
const usersRouter = require('./users');
const authRouter = require('./auth');


module.exports = (app) => {  
  app.use('/api/v1/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.use(errorHandlingMiddleware);
  
};
