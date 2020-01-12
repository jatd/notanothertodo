import * as React from 'react';
import { Icon, Popover, Button } from 'antd';
import { AntRangePicker, AntSelect } from '../Ant-Fields';
import { Form, Formik, Field } from 'formik';
import { TodosContext, FilterState } from '../../providers/TodosProvider';
import * as Yup from 'yup';

import * as styles from './styles.scss';

interface TodoFilterProps {
  title: string;
}

const TodoFilter: React.FunctionComponent<TodoFilterProps> = props => {
  const [filtersVisible, togglePopover] = React.useState(false);
  const { filters, setFilters, clearFilters } = React.useContext(TodosContext);

  const handleVisibleChange = (visible: boolean) => {
    togglePopover(visible);
  };

  const handleSubmit = (values: FilterState) => {
    setFilters({
      ...filters,
      ...values,
    });
    togglePopover(false);
  };

  const filterFormSchema = Yup.object().shape({
    state_filter: Yup.string(),
    duedate: Yup.array(),
  });

  const initialValues = { ...filters };

  const FilterForm = () => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={filterFormSchema}
        render={({ dirty, isValid, resetForm }: any) => {
          return (
            <Form className={styles.form}>
              <Field
                component={AntRangePicker}
                name="duedate_filter"
                placeholder={['Start Time', 'End Time']}
                label="Between These Dates"
              />
              <Field
                component={AntSelect}
                name="state_filter"
                selectOptions={['Todo', 'In-Progress', 'Done']}
                label="The State of the Todo"
              />
              <div className={styles.filterButtons}>
                <Button
                  htmlType="submit"
                  type="danger"
                  disabled={!dirty || !isValid}
                >
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    clearFilters();
                    resetForm();
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Form>
          );
        }}
      />
    );
  };

  return (
    <div className={styles.todoFilter}>
      <span className={styles.title}>{props.title}</span>
      <Popover
        content={<FilterForm />}
        title="Filter"
        trigger="click"
        visible={filtersVisible}
        onVisibleChange={handleVisibleChange}
        placement="bottomRight"
      >
        <Icon type="filter" />
      </Popover>
    </div>
  );
};

export default TodoFilter;
