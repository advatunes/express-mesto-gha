const config = {
  port: process.env.PORT || 3000,
  mongoUri: "mongodb://localhost:27017/mestodb",
  jwtSecret: "secret",
};

module.exports = config;
