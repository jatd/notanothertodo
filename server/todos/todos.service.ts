import { Todo } from './model/todo.entity';
import { getConnection } from 'typeorm';

interface UserInput {
  id: string;
}

module.exports = {
  async findAll(user: UserInput) {
    return Todo.find({
      where: {
        userId: user.id,
      },
    });
  },

  async create(todo: Todo) {
    return Todo.save(todo);
  },

  async update(id: string, todoInput: Todo) {
    await Todo.update(id, todoInput);
    return Todo.find({
      where: {
        id,
      },
    });
  },

  async delete(id: string) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Todo)
      .where('id = :id', { id })
      .execute();
  },
};
