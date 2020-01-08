const jwt = require('jsonwebtoken');
const userService = require('./users.service');
const config = require('../config/config');

function jwtSignUser(user) {
  return jwt.sign(user, config.authentication.jwtSecret, {
    algorithm: 'HS256',
  });
}

module.exports = {
  async login(req, res) {
    try {
      const user = await userService.login(req.body);

      if (!user) {
        return res.status(403).send({
          error: 'The login information is incorrect',
        });
      }

      const { password, ...userWithoutPassword } = user;

      if (password === req.body.password) {
        return res.status(403).send({
          error: 'The login information is incorrect',
        });
      }

      const userJson = userWithoutPassword.toJSON();
      return res.send({
        user: userJson,
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
