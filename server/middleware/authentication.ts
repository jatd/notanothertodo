import { Request, Response, NextFunction } from 'express';
const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports = {
  async authorized(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization').replace('Bearer', '');
    const data = await jwt.verify(
      token.trim(),
      config.authentication.jwtSecret,
      {
        algorithm: 'HS256',
      },
    );

    if (data) {
      return next();
    }

    return res.status(400).send({
      error: 'An error has occured',
    });
  },
};
