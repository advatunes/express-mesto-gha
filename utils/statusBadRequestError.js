class STATUS_BAD_REQUEST extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = STATUS_BAD_REQUEST;
