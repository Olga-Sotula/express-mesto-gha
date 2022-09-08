const { STATUS_SERVER_ERROR } = require('./constants');

class ErrorServer extends Error {
  constructor(message) {
    super(message);
    this.code = STATUS_SERVER_ERROR;
  }
}

module.exports = { ErrorServer };
