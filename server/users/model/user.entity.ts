import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Todo } from '../../todos/model/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    select: false,
    nullable: false,
  })
  password: string;

  @OneToMany(
    () => Todo,
    todo => todo.user,
  )
  todos: Todo[];
}
