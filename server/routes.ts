import { Express } from 'express';
const usersRouter = require('./users/users.route');
const todosRouter = require('./todos/todos.route');

module.exports = (app: Express) => {
  app.use('/users', usersRouter);
  app.use('/todos', todosRouter);
};
