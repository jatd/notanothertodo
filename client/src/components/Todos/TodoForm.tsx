import * as React from 'react';
import { Button } from 'antd';
import { AntInput, AntDatePicker, AntSelect } from '../Ant-Fields';
import { Form, Field, Formik, FormikHelpers } from 'formik';
import * as moment from 'moment';
import * as Yup from 'yup';
import { FormValues } from './index';
import { Todo } from '../../providers/TodosProvider';
import * as styles from './styles.scss';

interface TodoFormProps {
  handleSubmit: (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => void;
  editTodo: Todo;
}

const TodoForm: React.FunctionComponent<TodoFormProps> = ({
  handleSubmit,
  editTodo,
}) => {
  const TodosSchema = Yup.object().shape({
    description: Yup.string().required('Required'),
    duedate: Yup.date().required('Required'),
  });

  const initalValues = {
    description: editTodo ? editTodo.description : '',
    duedate: editTodo ? moment(editTodo.duedate) : moment(),
    state: editTodo ? editTodo.state : 'Todo',
  };

  return (
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
            <Field
              component={AntDatePicker}
              name="duedate"
              placeholder="Enter due date"
              label="Due Date"
            />
            <Field
              component={AntSelect}
              name="state"
              selectOptions={['Todo', 'In-Progress', 'Done']}
              label="State of Todo"
            />
            <Button htmlType="submit" type="danger">
              {!editTodo ? 'Add' : 'Edit'}
            </Button>
          </Form>
        );
      }}
    />
  );
};

export default TodoForm;
