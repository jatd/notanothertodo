const authRouter = require('./routes/authentication');

module.exports = app => {
  app.use('/auth', authRouter);
};
