const { STATUS_NOT_FOUND } = require('./constants');

class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.code = STATUS_NOT_FOUND;
  }
}

module.exports = ErrorNotFound;
