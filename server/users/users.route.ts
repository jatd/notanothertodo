import * as express from 'express';
const UserController = require('./users.controller');
const UserPolicy = require('./users.policy');

const usersRouter = express.Router();

usersRouter.post('/login', UserPolicy, UserController.login);

module.exports = usersRouter;
