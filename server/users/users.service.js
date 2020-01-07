const { User } = require('../models');

module.exports = {
  async login({ email, password }) {
    try {
      return User.findOne({
        where: {
          email,
          password,
        },
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
