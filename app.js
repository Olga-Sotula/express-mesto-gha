const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const auth = require('./middlewares/auth');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { authRouter } = require('./routes/auth');
const {
  StatusNotFound,
} = require('./errors/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '63077aa6994df69055a6ffb9',
  };

  next();
});

app.use(express.json());
app.use(cookieParser());

app.use(authRouter);
app.use(auth);
app.use(userRouter);
app.use(cardRouter);

app.all('*', (req, res) => {
  res.status(StatusNotFound).send({ message: ' Запрос не обрабатывается' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
