class STATUS_DUPLICATE_EMAIL extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  STATUS_DUPLICATE_EMAIL,
};
