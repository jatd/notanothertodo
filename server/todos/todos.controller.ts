import { Request, Response } from 'express';
const todosService = require('./todos.service');

module.exports = {
  async findAll(req: Request, res: Response) {
    try {
      const todos = await todosService.findAll(req.query);
      return res.send({
        todos,
      });
    } catch (err) {
      console.error(err);
      return res.status(400).send({
        error: 'An error has occured trying to get your todos',
      });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const todo = await todosService.create(req.body);
      return res.send({
        todo,
      });
    } catch (err) {
      console.error(err);
      return res.status(400).send({
        error: 'Could not create the todo',
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const todo = await todosService.update(req.params.id, req.body);
      return res.send({
        todo,
      });
    } catch (err) {
      console.error(err);
      return res.status(400).send({
        error: 'Could not update this todo',
      });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await todosService.delete(req.params.id);
      return res.sendStatus(204);
    } catch (err) {
      console.error(err);
      return res.status(403).send({
        error: 'Could not delete this todo',
      });
    }
  },
};
