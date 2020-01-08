const Joi = require('joi');

module.exports = (req, res, next) => {
  const schema = {
    email: Joi.string().email(),
    password: Joi.string(),
  };

  const { error } = Joi.validate(req.body, schema);

  if (error) {
    switch (error.details[0].context.key) {
      case 'email':
        res.status(400).send({
          error: 'You must provide a valid email address',
        });
        break;
      case 'password':
        res.status(400).send({
          error: 'Password is not valid',
        });
        break;
      default:
        res.status(400).send({
          error: 'Invalid information',
        });
    }
    console.log(error);
  } else {
    next();
  }
};
