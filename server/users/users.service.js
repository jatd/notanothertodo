const { User } = require('../models');

module.exports = {
  async login({ email }) {
    try {
      return User.findOne({
        where: {
          email,
        },
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
