const { STATUS_BAD_REQUEST } = require('./constants');

class ErrorBadRequest extends Error {
  constructor(message) {
    super(message);
    this.code = STATUS_BAD_REQUEST;
  }
}

module.exports = { ErrorBadRequest };
