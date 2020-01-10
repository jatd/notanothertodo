import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  Check,
  BaseEntity,
} from 'typeorm';
import { User } from '../../users/model/user.entity';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({ type: 'datetime' })
  duedate: Date;

  @Column({
    default: 'Todo',
  })
  @Check(`"state" IN ('Todo', 'In-Progress', 'Done')`)
  state: string;

  @ManyToOne(
    () => User,
    user => user.todos,
  )
  user: User;
}
