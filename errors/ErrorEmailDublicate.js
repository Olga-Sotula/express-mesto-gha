const { STATUS_EMAIL_DUBLICATE } = require('./constants');

class ErrorEmailDublicate extends Error {
  constructor(message) {
    super(message);
    this.code = STATUS_EMAIL_DUBLICATE;
  }
}

module.exports = { ErrorEmailDublicate };
