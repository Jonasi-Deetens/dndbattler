import React, { useCallback, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth.tsx';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikConfig } from 'formik';

const useValidationSchema = () => {
  return yup.object().shape({
    email: yup.string().required('Please fill in your email.').email(),
    password: yup.string().required('Please fill in your password.')
  });
};

type LoginFormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const onSubmit: FormikConfig<LoginFormValues>['onSubmit'] = useCallback(
    async values => {
      try {
        await login(values.email, values.password);
        setError('Login succesfull!');
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
    },
    [login]
  );

  const valSchema = useValidationSchema();

  const formik: FormikConfig<LoginFormValues> = useMemo(
    () => ({
      onSubmit,
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: valSchema
    }),
    [onSubmit, valSchema]
  );

  return (
    <div>
      <Formik<LoginFormValues> {...formik} key={'login-formik'}>
        <Form>
          <h2>Login</h2>
          <Field
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="email"
          />
          <ErrorMessage name="email" component="div" className="error" />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
          />
          <ErrorMessage name="password" component="div" className="error" />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="error">{error}</div>}
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
