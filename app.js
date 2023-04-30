const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const config = require("./config");
const { STATUS_NOT_FOUND } = require("./utils/errors");

const {
  userRouter,
  cardRouter,
  loginRouter,
  createUserRouter,
} = require("./routes");

const app = express();

const auth = require("./middlewares/auth");

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loginRouter);
app.use(createUserRouter);

app.use("/users", auth, userRouter);
app.use("/cards", auth, cardRouter);

app.use((req, res, next) => {
  next(new STATUS_NOT_FOUND("Запрашиваемый ресурс не найден"));
});

app.use(errors());

app.use((err, req, res, next) => {
  if (err && err.code === 11000) {
    res.status(409).send({ message: "Такой пользователь уже существует" });
    return;
  }
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next(err);
});

app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});
