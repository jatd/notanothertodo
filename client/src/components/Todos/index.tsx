import * as React from 'react';
import * as moment from 'moment';

import { TodosContext, Todo } from '../../providers/TodosProvider';
import api from '../../services/api';

//Components
import { FormikHelpers } from 'formik';
import { Card, List, Button, Modal, Icon, Spin } from 'antd';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';

import * as styles from './styles.scss';

export interface FormValues {
  description: string;
  duedate: moment.Moment;
  state: string;
}

const Todos: React.FunctionComponent = () => {
  const {
    initializeTodoState,
    addTodo,
    removeTodo,
    updateTodos,
    toggleEditMode,
    toggleModal,
    todos,
    editTodo,
    isModalOpen,
    isLoading,
    filters,
  } = React.useContext(TodosContext);

  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  React.useEffect(() => {
    fetchAllTodos();
  }, []);

  const fetchAllTodos = async () => {
    try {
      const data: any = await api().get('/todos', {
        params: user,
      });
      initializeTodoState(data.data.todos);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      if (!editTodo) {
        const { data }: any = await api().post('/todos', {
          ...values,
          user,
        });
        addTodo(data.todo);
      } else {
        const { data }: any = await api().put(`/todos/${editTodo.id}`, {
          ...values,
        });

        updateTodos(data.todo[0]);
        toggleEditMode();
      }

      toggleModal(false);
    } catch (err) {
      console.log(err);
    }
    resetForm();
  };

  const deleteTodo = async (id: number) => {
    try {
      const data = await api().delete(`/todos/${id}`);
      if (data.status === 204) {
        removeTodo(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <Spin />
      </div>
    );
  }

  let filteredTodos = filters.state_filter
    ? todos.filter((todo: Todo) => todo.state === filters.state_filter)
    : todos;

  filteredTodos =
    filters.duedate_filter.length === 2
      ? filteredTodos.filter((todo: Todo) =>
          moment(todo.duedate).isBetween(
            filters.duedate_filter[0],
            filters.duedate_filter[1],
          ),
        )
      : filteredTodos;

  const todoDescriptions = filteredTodos
    .sort((a: any, b: any) => moment(a.duedate).diff(moment(b.duedate)))
    .map((todo: Todo) => (
      <TodoItem
        todo={todo}
        deleteTodo={deleteTodo}
        editTodo={toggleEditMode}
        toggleModal={toggleModal}
      />
    ));

  const data = [...todoDescriptions];

  return (
    <div className={styles.wrapper}>
      <Card
        title={<TodoFilter title="My TODO List" />}
        className={styles.todosCard}
      >
        <List
          size="large"
          bordered
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
        <br />
        <Modal
          title={!editTodo ? 'Create Todo' : 'Edit Todo'}
          visible={isModalOpen}
          okText={'Add Todo'}
          onCancel={() => {
            toggleEditMode();
            toggleModal(false);
          }}
          footer={null}
        >
          <TodoForm handleSubmit={handleSubmit} editTodo={editTodo} />
        </Modal>
        <Button
          size="large"
          type="primary"
          onClick={() => toggleModal(true)}
          className={styles.openModalButton}
        >
          <Icon type="plus" />
        </Button>
      </Card>
    </div>
  );
};

export default Todos;
