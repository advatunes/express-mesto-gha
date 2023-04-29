class STATUS_UNAUTHORIZED_ACTION extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = STATUS_UNAUTHORIZED_ACTION;
