import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

module.exports = (req: Request, res: Response, next: NextFunction) => {
  const schema = {
    description: Joi.string(),
    duedate: Joi.date(),
    state: Joi.string(),
    user: Joi.object({
      id: Joi.number(),
      email: Joi.string().email(),
    }),
  };

  const { error }: any = Joi.validate(req.body, schema);

  if (error) {
    switch (error.details[0].context.key) {
      case 'description':
        res.status(400).send({
          error: 'You must provide a valid description',
        });
        break;
      case 'duedate':
        res.status(400).send({
          error: 'Due Date is not valid',
        });
        break;
      case 'state':
        res.status(400).send({
          error: 'State is not valid',
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
