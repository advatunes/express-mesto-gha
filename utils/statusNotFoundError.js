class STATUS_NOT_FOUND extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = STATUS_NOT_FOUND;
