const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const urlRegex = require("../utils/constants");

const { STATUS_INVALID_CREDENTIALS } = require("../utils/errors");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Жак-Ив Кусто",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Исследователь",
    },
    avatar: {
      type: String,
      match: urlRegex,
      default:
        "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Некорректный email",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { validateBeforeSave: true },
);

userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new STATUS_INVALID_CREDENTIALS(
          "Неверный адрес электронной почты или пароль",
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new STATUS_INVALID_CREDENTIALS(
            "Неверный адрес электронной почты или пароль",
          );
        }

        return user;
      });
    })
    .catch(next);
};

module.exports = mongoose.model("user", userSchema);
