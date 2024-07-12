import React, { useCallback, useMemo, useState } from "react";
import useAuth from "../hooks/useAuth";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikConfig } from "formik";
import { useNavigate } from "react-router-dom";

const useValidationSchema = () => {
  return yup.object().shape({
    username: yup.string().required("Please fill in your username."),
    email: yup.string().required("Please fill in your email.").email(),
    password: yup.string().required("Please fill in your password."),
    confirmPassword: yup
      .string()
      .required("Please fill in password confirmation."),
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

  const onSubmit: FormikConfig<RegisterFormValues>["onSubmit"] = useCallback(
    async (values) => {
      try {
        await register(
          values.username,
          values.email,
          values.password,
          values.confirmPassword
        );
        setError("Succesfully registered!");
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
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
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: valSchema,
    }),
    [onSubmit, valSchema]
  );

  return (
    <div className="bg-register h-screen w-full flex flex-col justify-center">
      <Formik<RegisterFormValues> {...formik} key={"register-formik"}>
        <Form className="m-auto w-11/12 md:w-1/3 bg-slate-700 p-10 rounded-lg shadow-lg flex flex-col gap-y-5">
          <h2 className="text-2xl">Register</h2>
          <Field
            type="username"
            name="username"
            placeholder="Username"
            aria-label="Username"
            autoComplete="username"
            className="p-2 text-gray-500"
          />
          <ErrorMessage name="username" component="div" className="error" />
          <Field
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="email"
            className="p-2 text-gray-500"
          />
          <ErrorMessage name="email" component="div" className="error" />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
            className="p-2 text-gray-500"
          />
          <ErrorMessage name="password" component="div" className="error" />
          <Field
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            aria-label="ConfirmPassword"
            autoComplete="current-confirmPassword"
            className="p-2 text-gray-500"
          />
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className="error"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
          <button
            className="bg-transparent"
            onClick={() => {
              navigate("/");
            }}
          >
            &lt; back
          </button>
          {error && <div className="error">{error}</div>}
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
