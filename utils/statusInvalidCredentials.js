class STATUS_INVALID_CREDENTIALS extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = STATUS_INVALID_CREDENTIALS;
