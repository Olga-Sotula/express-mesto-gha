const { STATUS_BAD_AUTH } = require('./constants');

class ErrorBadAuth extends Error {
  constructor(message) {
    super(message);
    this.code = STATUS_BAD_AUTH;
  }
}

module.exports = { ErrorBadAuth };
