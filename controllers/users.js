// //const userSchema = require('../models/user');
const User = require('../models/user');

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_SERVER_ERROR = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};
module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
  // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(HTTP_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      res.send({ data: user });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(HTTP_BAD_REQUEST).send({ message: 'Некорректный ID' });
      }
      res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(HTTP_CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_BAD_REQUEST).send({ message: 'Некорректные данные пользователя' });
        return;
      }
      res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  if (!name || !about) {
    res.status(HTTP_BAD_REQUEST).send({ message: 'Некорректные данные профиля' });
    return;
  }
  User.findByIdAndUpdate(
    userId,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(HTTP_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      res.send({ data: user });
    })
  // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(HTTP_BAD_REQUEST).send({ message: 'Некорректный ID пользователя' });
      }
      if (err.name === 'ValidationError') {
        return res.status(HTTP_BAD_REQUEST).send({ message: 'Некорректные данные пользователя' });
      }
      res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  if (!avatar) {
    res.status(HTTP_BAD_REQUEST).send({ message: 'Некорректные данные при обновлении аватара.' });
    return;
  }
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(HTTP_OK).send(user))
    .catch((err) => {
      // eslint-disable-next-line no-undef
      if (err.message === 'CastError') {
        res.status(HTTP_BAD_REQUEST).send({ message: 'Невалидные данные для обновления аватара.' });
        return;
      }

      if (err.name === 'DocumentNotFoundError') {
        res.status(HTTP_NOT_FOUND).send({ message: 'Нет пользователя с таким id.' });
        return;
      }

      res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};
