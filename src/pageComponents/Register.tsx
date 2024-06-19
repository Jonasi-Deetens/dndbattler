import React, { useCallback, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikConfig } from 'formik';

const useValidationSchema = () => {
  return yup.object().shape({
    username: yup.string().required('Please fill in your username.'),
    email: yup.string().required('Please fill in your email.').email(),
    password: yup.string().required('Please fill in your password.'),
    confirmPassword: yup
      .string()
      .required('Please fill in password confirmation.')
  });
};

type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
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
        setError('Succesfully registered!');
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
    },
    [register]
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
    <div>
      <Formik<RegisterFormValues> {...formik} key={'register-formik'}>
        <Form>
          <h2>Register</h2>
          <Field
            type="username"
            name="username"
            placeholder="Username"
            aria-label="Username"
            autoComplete="username"
          />
          <ErrorMessage name="username" component="div" className="error" />
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
          <Field
            type="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            aria-label="ConfirmPassword"
            autoComplete="current-confirmPassword"
          />
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className="error"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          {error && <div className="error">{error}</div>}
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
