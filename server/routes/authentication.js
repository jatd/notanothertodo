const express = require('express');
const UserController = require('../users/users.controller');

const authRouter = express.Router();

const redirectLogin = (req, res, next) =>
  !req.session.userId ? res.redirect('/login') : next();

authRouter.use(redirectLogin);
authRouter.post('/login', UserController.login);

module.exports = authRouter;
