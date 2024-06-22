import React, { useCallback, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth.tsx';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikConfig } from 'formik';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const onSubmit: FormikConfig<LoginFormValues>['onSubmit'] = useCallback(
    async values => {
      try {
        await login(values.email, values.password);
        setError('Login succesfull!');
        navigate('/characterSelect');
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
    },
    [login, navigate]
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
    <div className="bg-login h-screen w-full flex flex-col justify-center">
      <Formik<LoginFormValues> {...formik} key={'login-formik'}>
        <Form className="m-auto w-11/12 md:w-1/2 bg-slate-700 p-10 rounded-lg shadow-lg">
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
