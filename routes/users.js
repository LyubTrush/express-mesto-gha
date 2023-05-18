const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// Получение всех пользователей
router.get('/users', getUsers);

// Получение пользователя по ID
router.get('/users/:userId', getUserById);

// Создание пользователя
router.post('/users', createUser);

// Обновление профиля
router.patch('/users/me', updateProfile);

// Обновление аватара
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
