import { User } from './model/user.entity';
import { getRepository } from 'typeorm';
interface UserInput {
  email: string;
  password: string;
}

module.exports = {
  async login(user: UserInput) {
    const { email, password } = user;
    return await getRepository(User)
      .createQueryBuilder('user')
      .where('user.email= :email AND user.password = :password', {
        email,
        password,
      })
      .getOne();
  },
};
