const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const errorStatus = require('./errors/constants');

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

app.use(userRouter);
app.use(cardRouter);

app.all('*', (req, res) => {
  res.status(errorStatus.notFound).send({ message: ' Запрос не обрабатывается' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
