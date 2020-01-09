import { User } from '../users/model/user.entity';

export const seedDataBase = async (connection: any) => {
  try {
    let user = new User();
    user.email = 'test@gmail.com';
    user.password = 'test';
    await connection.manager.save(user);
  } catch (err) {
    console.log('err', err);
  }
};
