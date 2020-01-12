import * as React from 'react';
import { Icon } from 'antd';
import { Todo } from '../../providers/TodosProvider';
import * as styles from './styles.scss';

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: number) => {};
  editTodo: (todo: Todo) => void;
  toggleModal: (isModalOpen: boolean) => void;
}

export default function TodoItem(props: TodoItemProps) {
  const { todo, deleteTodo, editTodo, toggleModal } = props;
  return (
    <div className={styles.todoItem}>
      {todo.state === 'Done' && <Icon type="check" />}
      <div>{todo.description}</div>
      <div className={styles.todoItem_icons}>
        <Icon
          type="edit"
          onClick={() => {
            editTodo(todo);
            toggleModal(true);
          }}
        />
        <Icon
          type="close"
          onClick={() => {
            deleteTodo(todo.id);
          }}
        />
      </div>
    </div>
  );
}
