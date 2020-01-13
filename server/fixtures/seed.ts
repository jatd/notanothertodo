import { User } from '../users/model/user.entity';

export const seedDatabase = async (connection: any) => {
  try {
    console.log('Adding User...');
    let user = new User();
    user.email = 'user01@gmail.com';
    user.password = 'superdupersecure01';
    await connection.manager.save(user);
    console.log('--Completed User Creation and Insertion--');
  } catch (err) {
    console.log('err', err);
  }
};
