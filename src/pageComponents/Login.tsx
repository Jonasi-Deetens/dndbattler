import React, { useCallback, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth.tsx';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikConfig } from 'formik';
import { useNavigate } from 'react-router-dom';

const useValidationSchema = () => {
  return yup.object().shape({
    email: yup.string().required('Please enter your email.').email(),
    password: yup.string().required('Please enter your password.')
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
        setError(null); // Clear any previous error
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
    <div className="bg-gray-900 h-screen w-full flex items-center justify-center">
      <Formik<LoginFormValues> {...formik} key={'login-formik'}>
        <Form className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-white text-center">
            Login
          </h2>

          <div className="flex flex-col gap-1">
            <Field
              type="email"
              name="email"
              placeholder="Email"
              aria-label="Email"
              autoComplete="email"
              className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Field
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
              autoComplete="current-password"
              className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg bg-yellow-500 text-gray-900 font-bold ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-yellow-400 active:bg-yellow-600 transition-all duration-200 ease-in-out'
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <button
            type="button"
            className="nav-button"
            onClick={() => {
              navigate('/');
            }}
          >
            &lt; Back to Home
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
