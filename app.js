const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");

const {
  userRouter, cardRouter, loginRouter, createUserRouter,
} = require("./routes");

const { PORT = 3000 } = process.env;
const app = express();

const auth = require("./middlewares/auth");

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loginRouter);
app.use(createUserRouter);

app.use(auth);
app.use(userRouter);

app.use(cardRouter);

app.use((req, res, next) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
  next();
});

app.use(errors());

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? "На сервере произошла ошибка"
        : message,
    });
  next(err);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
