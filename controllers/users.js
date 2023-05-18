// //const userSchema = require('../models/user');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
  // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send({ data: user });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный ID' });
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные пользователя' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { userId } = req.user._id;
  if (!name || !about) {
    res.status(400).send({ message: 'Некорректные данные профиля' });
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
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send({ data: user });
    })
  // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный ID пользователя' });
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  if (!avatar) {
    res.status(400).send({ message: 'Некорректные данные при обновлении аватара.' });
    return;
  }
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      // eslint-disable-next-line no-undef
      if (err instanceof CastError) {
        res.status(400).send({ message: 'Некорректные данные' });
        return;
      }

      // eslint-disable-next-line no-undef
      if (err instanceof DocumentNotFoundError) {
        res.status(404).send({ message: 'Пользователь не обнаружен' });
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
};
