// app.js — входной файл
// Здесь мы подключаем Express для создания сервера, Mongoose для работы с MongoDB
const express = require('express');
const mongoose = require('mongoose');
// пакет celebrate
const { errors } = require('celebrate');

// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const helmet = require('helmet');
// Здесь мы подключаем модуль router, содержит определение всех маршрутов для нашего приложения.
const router = require('./routes/users');
const routerCard = require('./routes/cards');

const { PORT = 3000 } = process.env;

// Здесь мы создаем экземпляр приложения Express и настраиваем middleware для обработки JSON-данных.
const app = express();
app.use(express.json());
app.use(helmet());

// celebrate error handler
app.use(errors());

// Обработчик маршрута для неправильных путей
app.use((req, res, next) => {
  const error = new Error('Страница не найдена');
  error.status = 404;
  next(error);
});

// Обработчик ошибок
app.use((err, req, res) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Произошла ошибка',
    },
  });
});
// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use((req, res, next) => {
  req.user = {
    _id: '64652cb234ebe63e152b3c8e', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', router);
app.use('/cards', routerCard);

app.listen(PORT);
