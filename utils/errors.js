class STATUS_NOT_FOUND extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = STATUS_NOT_FOUND;

class STATUS_CREATED extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 201;
  }
}

module.exports = STATUS_CREATED;

class STATUS_BAD_REQUEST extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = STATUS_BAD_REQUEST;

class STATUS_INTERNAL_SERVER_ERROR extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = STATUS_INTERNAL_SERVER_ERROR;

class STATUS_INVALID_CREDENTIALS extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = STATUS_INVALID_CREDENTIALS;

class STATUS_DUPLICATE_EMAIL extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = STATUS_DUPLICATE_EMAIL;

class STATUS_UNAUTHORIZED_ACTION extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = STATUS_UNAUTHORIZED_ACTION;
