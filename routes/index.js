const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { loginValidate, createUserValidate } = require('../middlewares/validation');
const {
  login,
  createUser,
} = require('../controllers/users');

router.post('/signin', loginValidate, login);
router.post('/signup', createUserValidate, createUser);
router.use(auth);
router.use('/', userRouter);
router.use('/cards', cardRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('404: страница не существует'));
});

module.exports = router;
