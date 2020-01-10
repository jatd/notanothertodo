import * as React from 'react';
import { Card, Button } from 'antd';
import { Form, Field, Formik } from 'formik';
import { AntInput } from '../Ant-Fields';
import * as Yup from 'yup';
import api from '../../services/api';
import { AuthContext } from '../../providers/AuthProvider';
import { LoginProps } from '../../providers/AuthProvider';
import { useHistory } from 'react-router-dom';
import * as styles from './styles.scss';

interface LoginFormValues {
  email: string;
  password: string;
}

interface FetchedLoginData {
  data: LoginProps;
}

const Login: React.FunctionComponent = () => {
  const { login } = React.useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const { data }: FetchedLoginData = await api().post(
        'http://localhost:3000/users/login',
        {
          ...values,
        },
      );

      login(data);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
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
                  placeholder="Email"
                />
                <Field
                  component={AntInput}
                  name="password"
                  type="password"
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
};

export default Login;
