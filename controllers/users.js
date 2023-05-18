// //const userSchema = require('../models/user');
const User = require("../models/user");


module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};
module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Некорректный ID" });
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { userId } = req.user._id;
  User.findByIdAndUpdate(
    userId,
    {
      name,
      about,
    },
    {
      new: true,
    }
  ).catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Некорректный ID пользователя' });
    }
    res.status(500).send({ message: 'Произошла ошибка' });
  });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { userId } = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

// async function getUsers(req, res) {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// }

// async function getUserById(req, res) {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).send({ message: 'User not found' });
//     }
//     res.send(user);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// }

// async function createUser(req, res) {
//   try {
//     const { name, about, avatar } = req.body;
//     const user = await User.create({ name:name, about:about, avatar:avatar });
//     res.send(user);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// }

// module.exports = {
//   getUsers,
//   getUserById,
//   createUser,
// };
