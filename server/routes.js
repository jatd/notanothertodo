const usersRouter = require('./users/users.route');

module.exports = app => {
  app.use('/users', usersRouter);
};
