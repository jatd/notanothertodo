import * as express from 'express';

const TodosController = require('./todos.controller');
const TodosPolicy = require('./todos.policy');

const authentication = require('../middleware/authentication');

const todosRouter = express.Router();
todosRouter.use(authentication.authorized);
todosRouter.get('/', TodosController.findAll);
todosRouter.post('/', TodosPolicy, TodosController.create);
todosRouter.put('/:id', TodosController.update);
todosRouter.delete('/:id', TodosController.delete);

module.exports = todosRouter;
