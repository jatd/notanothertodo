import { Request, Response } from 'express';

const jwt = require('jsonwebtoken');
const userService = require('./users.service');
const config = require('../config/config');

function jwtSignUser(user: string) {
  return jwt.sign(user, config.authentication.jwtSecret, {
    algorithm: 'HS256',
  });
}

module.exports = {
  async login(req: Request, res: Response) {
    try {
      const user = await userService.login(req.body);

      if (!user) {
        return res.status(403).send({
          error: 'The login information is incorrect',
        });
      }

      const userJson = JSON.stringify(user);

      return res.send({
        user,
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      console.error(err);
      return res.status(403).send({
        error: 'An error has occured trying to log in',
      });
    }
  },
};
