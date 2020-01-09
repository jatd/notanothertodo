import * as React from 'react';
import { Card, Button } from 'antd';
import { Form, Field, Formik } from 'formik';
import { AntInput } from '../Ant-Input';
import * as Yup from 'yup';
import api from '../../services/api';
import { AuthContext } from '../../providers/AuthProvider';
import { LoginProps } from '../../providers/AuthProvider';
import * as styles from './styles.scss';
import { useHistory } from 'react-router-dom';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FunctionComponent = () => {
  const { login } = React.useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const userData: LoginProps = await api().post(
        'http://localhost:3000/users/login',
        {
          ...values,
        },
      );

      login && login(userData);
      history.push('/todos');
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
};

export default Login;
