/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (value) => value.length >= 2 && value.length <= 30,
      message: 'Имя пользователя должна быть длиной от 2 до 30 символов',
    },
  },
  about: {
    type: String,
    required: true,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (value) => value.length >= 2 && value.length <= 30,
      message: 'Информация о пользователе должна быть длиной от 2 до 30 символов',
    },
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Неправильный формат ссылки',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Неправильный формат адреса электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
    validate: {
      validator: (value) => value.length >= 8,
      message: 'Пароль должен содержать минимум 8 символов',
    },
  },
});

// добавим метод findUserByCredentials схеме пользователя

userSchema.statics.findUserByCredentials = function _(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new UnauthorizedError('Неправильные логин или пароль'));
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
