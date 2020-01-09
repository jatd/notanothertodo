import * as React from 'react';
import { Card, Button } from 'antd';
import { Form, Field, Formik } from 'formik';
import { AntInput } from '../Ant-Input';
import * as Yup from 'yup';
import api from '../../services/api';

import * as styles from './styles.scss';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const handleSubmit = (values: LoginFormValues) => {
    return api().post('http://localhost:3000/users/login', { ...values });
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div className={styles.login}>
      <Card title="Login" className={styles.loginCard}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
          render={() => {
            return (
              <Form>
                <Field
                  component={AntInput}
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                />
                <Field
                  component={AntInput}
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                />
                <Button htmlType="submit">Submit</Button>
              </Form>
            );
          }}
        />
      </Card>
    </div>
  );
}
