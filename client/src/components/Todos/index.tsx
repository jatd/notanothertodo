import * as React from 'react';
import { Card, List, Button, Modal, Icon, Spin } from 'antd';
import { AntInput, AntDatePicker, AntSelect } from '../Ant-Fields';
import { Form, Field, Formik, FormikHelpers } from 'formik';
import { TodosContext, Todo } from '../../providers/TodosProvider';
import * as moment from 'moment';
import TodoItem from './TodoItem';
import api from '../../services/api';
import * as Yup from 'yup';
import * as styles from './styles.scss';

interface FormValues {
  description: string;
  duedate: moment.Moment;
  state: string;
}

interface TodoState {
  visible: boolean;
  editTodo: Todo;
  isLoading: boolean;
}

const Todos: React.FunctionComponent = () => {
  const {
    initializeTodoState,
    addTodo,
    removeTodo,
    updateTodos,
    todos,
  } = React.useContext(TodosContext);

  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const [state, setState] = React.useState<TodoState>({
    visible: false,
    editTodo: null,
    isLoading: true,
  });

  React.useEffect(() => {
    fetchAllTodos();
  }, []);

  const fetchAllTodos = async () => {
    try {
      const data: any = await api().get('/todos', {
        params: user,
      });
      initializeTodoState(data.data.todos);
      setState({
        ...state,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const data = await api().delete(`/todos/${id}`);
      if (data.status === 204) {
        removeTodo(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editTodo = (todo: Todo) => {
    setState({
      ...state,
      editTodo: todo,
    });
  };

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const hideModal = () => {
    setState({
      ...state,
      visible: false,
      editTodo: null,
    });
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      hideModal();

      if (!state.editTodo) {
        const { data }: any = await api().post('/todos', {
          ...values,
          user,
        });
        return addTodo(data.todo);
      }

      const { data }: any = await api().put(`/todos/${state.editTodo.id}`, {
        ...values,
      });

      if (data) {
        updateTodos(data.todo[0]);
      }
    } catch (err) {
      console.log(err);
    }
    resetForm();
  };

  if (state.isLoading) {
    return (
      <div className={styles.wrapper}>
        <Spin />
      </div>
    );
  }
  const todoDescriptions = todos
    .sort((a: any, b: any) => moment(a.duedate).diff(moment(b.duedate)))
    .map((todo: Todo) => (
      <TodoItem todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} />
    ));

  const data = [...todoDescriptions];

  const TodosSchema = Yup.object().shape({
    description: Yup.string().required('Required'),
    duedate: Yup.date().required('Required'),
  });

  const initalValues = {
    description: state.editTodo ? state.editTodo.description : '',
    duedate: state.editTodo ? moment(state.editTodo.duedate) : moment(),
    state: state.editTodo ? state.editTodo.state : 'Todo',
  };

  return (
    <div className={styles.wrapper}>
      <Card title="My TODO List" className={styles.todosCard}>
        <List
          size="large"
          bordered
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
        <br />
        <Modal
          title={!state.editTodo ? 'Create Todo' : 'Edit Todo'}
          visible={state.visible || state.editTodo ? true : false}
          okText={'Add Todo'}
          onCancel={hideModal}
          footer={null}
        >
          <Formik
            enableReinitialize
            initialValues={initalValues}
            validationSchema={TodosSchema}
            onSubmit={handleSubmit}
            render={() => {
              return (
                <Form className={styles.form}>
                  <Field
                    component={AntInput}
                    name="description"
                    type="text"
                    placeholder="Enter your Todo"
                    label="Description"
                  />
                  <br />
                  <Field
                    component={AntDatePicker}
                    name="duedate"
                    placeholder="Enter due date"
                    label="Due Date"
                  />
                  <br />
                  <Field
                    component={AntSelect}
                    name="state"
                    selectOptions={['Todo', 'In-Progress', 'Done']}
                    label="State of Todo"
                  />
                  <Button htmlType="submit" type="danger">
                    {!state.editTodo ? 'Add' : 'Edit'}
                  </Button>
                </Form>
              );
            }}
          />
        </Modal>
        <Button
          size="large"
          type="primary"
          onClick={showModal}
          className={styles.openModalButton}
        >
          <Icon type="plus" />
        </Button>
      </Card>
    </div>
  );
};

export default Todos;
