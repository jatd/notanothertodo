import * as express from 'express';

const TodosController = require('./todos.controller');
const TodosPolicy = require('./todos.policy');

const todosRouter = express.Router();

todosRouter.get('/', TodosController.findAll);
todosRouter.post('/', TodosPolicy, TodosController.create);
todosRouter.put('/:id', TodosController.update);
todosRouter.delete('/:id', TodosController.delete);

module.exports = todosRouter;
