const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

const router = require("express").Router();

// Получение всех пользователей
router.get("/users", getUsers);

// Получение пользователя по ID
router.get("/users/:userId", getUserById);

// Создание пользователя
router.post("/users", createUser);

// Обновление профиля
router.patch("/me", updateProfile);

// Обновление аватара
router.patch("/me/avatar", updateAvatar);

module.exports = router;
