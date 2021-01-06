'use strict';
const { PermissionDeniedError } = require('../constants/errors');

// AllowedRoles --AccessLevel Needed TO Access resource
//  Actual Role -- Role Of user who is trying to access the resource
function hasPermission(allowedRoles, actualRole) {
  if (!allowedRoles) {
    return false;
  }

  return allowedRoles.includes(actualRole);
}

function authorize(allowedRoles = []) {
  return async (req, res, next) => {
    try {
    
      next();
    } catch (error) {
      next(error);
    }
  };
}


module.exports = {
  authorize,
  hasPermission,
};
