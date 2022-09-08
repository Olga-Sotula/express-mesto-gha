const { STATUS_FORBIDDEN } = require('./constants');

class ErrorForbidden extends Error {
  constructor(message) {
    super(message);
    this.code = STATUS_FORBIDDEN;
  }
}

module.exports = ErrorForbidden;
