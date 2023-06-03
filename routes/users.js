const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUser,
} = require('../controllers/users');

const {
  userIdValidate,
  updateProfileValidate,
  updateAvatarValidate,
} = require('../middlewares/validation');

// Получение всех пользователей
router.get('/users', getUsers);

// роут для получения информации о пользователе
router.get('/users/me', getUser);

// Получение пользователя по ID
router.get('/users/:userId', userIdValidate, getUserById);

// Обновление профиля
router.patch('/users/me', updateProfileValidate, updateProfile);

// Обновление аватара
router.patch('/users/me/avatar', updateAvatarValidate, updateAvatar);

module.exports = router;
