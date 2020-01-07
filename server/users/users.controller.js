const userService = require('./users.service');

module.exports = {
  async login(req, res) {
    const user = await userService.login(req.body);

    if (!user) {
      return res.status(403).send({
        error: 'The login information is incorrect',
      });
    }

    req.session.userId = user.id;
    const { password, ...userWithoutPassword } = user;
    return res.send(userWithoutPassword.toJSON());
  },

  async logout(req, res) {
    return res.session.destroy(err => {
      if (err) {
        return res.redirect('/');
      }
      res.clearCookie(process.env.SESS_NAME || 'sid');
      res.direct('/login');
    });
  },
};
