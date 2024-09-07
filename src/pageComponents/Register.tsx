import React, { useCallback, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikConfig } from 'formik';
import { useNavigate } from 'react-router-dom';

const useValidationSchema = () => {
  return yup.object().shape({
    username: yup.string().required('Please enter your username.'),
    email: yup.string().required('Please enter your email.').email(),
    password: yup.string().required('Please enter your password.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Please confirm your password.')
  });
};

type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
 };

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { register, isLoading } = useAuth();

  const onSubmit: FormikConfig<RegisterFormValues>['onSubmit'] = useCallback(
    async values => {
      try {
        await register(
          values.username,
          values.email,
          values.password,
          values.confirmPassword
        );
        setError('Successfully registered!');
        navigate('/characterSelect');
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
    },
    [register, navigate]
  );

  const valSchema = useValidationSchema();

  const formik: FormikConfig<RegisterFormValues> = useMemo(
    () => ({
      onSubmit,
      initialValues: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validationSchema: valSchema
    }),
    [onSubmit, valSchema]
  );

  return (
    <div className="bg-gray-900 h-screen w-full flex items-center justify-center">
      <Formik<RegisterFormValues> {...formik} key={'register-formik'}>
        <Form className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-white text-center">
            Register
          </h2>

          <div className="flex flex-col gap-1">
            <Field
              type="text"
              name="username"
              placeholder="Username"
              aria-label="Username"
              autoComplete="username"
              className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

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
              autoComplete="new-password"
              className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              autoComplete="new-password"
              className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <ErrorMessage
              name="confirmPassword"
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
            {isLoading ? 'Registering...' : 'Register'}
          </button>

          <button
            type="button"
            className="text-sm text-gray-400 hover:text-yellow-500 transition-all duration-200 ease-in-out"
            onClick={() => navigate('/')}
          >
            &lt; Back to Home
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
