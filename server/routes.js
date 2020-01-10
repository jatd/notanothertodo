const usersRouter = require('./users/users.route');
const todosRouter = require('./todos/todos.route');

module.exports = app => {
  app.use('/users', usersRouter);
  app.use('/todos', todosRouter);
};
