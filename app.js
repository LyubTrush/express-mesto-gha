// app.js — входной файл
// Здесь мы подключаем Express для создания сервера, Mongoose для работы с MongoDB
const express = require('express');
const mongoose = require('mongoose');
// пакет celebrate
const { errors } = require('celebrate');

// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const helmet = require('helmet');
// Здесь мы подключаем модуль router, содержит определение всех маршрутов для нашего приложения.
// const router = require('./routes/users');
// const routerCard = require('./routes/cards');
// const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/index');
// const { loginValidate, createUserValidate } = require('./middlewares/validation');
// const auth = require('./middlewares/auth');
// const {
//   login,
//   createUser,
// } = require('./controllers/users');

const { PORT = 3000 } = process.env;

// Здесь мы создаем экземпляр приложения Express и настраиваем middleware для обработки JSON-данных.
const app = express();
app.use(express.json());
app.use(helmet());

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
// app.post('/signin', loginValidate, login);
// app.post('/signup', createUserValidate, createUser);
// app.use(auth);
// app.use('/', router);
// app.use('/cards', routerCard);

// app.use('/*', (req, res, next) => {
//   next(new NotFoundError('404: страница не существует'));
// });

app.use(routes);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
