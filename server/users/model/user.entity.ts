import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Todo } from '../../todos/model/todo.entity';

@Entity()
export class User {
  @PrimaryColumn()
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
