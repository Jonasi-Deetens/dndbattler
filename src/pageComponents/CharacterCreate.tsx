import { ErrorMessage, Field, Form, Formik, FormikConfig } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import useCharacters from '../hooks/useCharacters';
import { NewCharacter } from '../types/DBTypes';
import useRaces from '../hooks/useRaces';
import useSubraces from '../hooks/useSubraces';
import useClasses from '../hooks/useClasses';

const useValidationSchema = () => {
  return yup.object().shape({
    email: yup.string().required('Please fill in your email.').email(),
    password: yup.string().required('Please fill in your password.')
  });
};

const CharacterCreate: React.FC = () => {
  const { handleAddCharacter } = useCharacters();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { races } = useRaces();
  const { subraces } = useSubraces();
  const { classes } = useClasses();

  const onSubmit: FormikConfig<NewCharacter>['onSubmit'] = useCallback(
    async values => {
      setIsLoading(true);
      try {
        await handleAddCharacter(values);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
      setIsLoading(false);
    },
    [handleAddCharacter]
  );

  const valSchema = useValidationSchema();

  const formik: FormikConfig<NewCharacter> = useMemo(
    () => ({
      onSubmit,
      initialValues: {
        name: '',
        userId: 1,
        classId: 1,
        subraceId: 1,
        raceId: 1,
        level: 1,
        experience: 0,
        health: 0,
        languages: [{ name: 'common' }],
        stats: {
          ac: 25,
          hp: 31,
          str: 0,
          dex: 0,
          con: 0,
          int: 0,
          wis: 0,
          cha: 0
        }
      },
      validationSchema: valSchema
    }),
    [onSubmit, valSchema]
  );
  return (
    <div className="h-screen w-full flex flex-col justify-center">
      <Formik<NewCharacter> {...formik} key={'character-create-formik'}>
        <Form className="m-auto w-11/12 md:w-1/2 bg-slate-700 p-10 rounded-lg shadow-lg">
          <h2>Character Creation</h2>
          <Field as="select" name="raceId" aria-label="Race">
            {races &&
              races.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
          </Field>
          <ErrorMessage name="raceId" component="div" className="error" />
          <Field as="select" name="subraceId" aria-label="Subrace">
            {subraces &&
              subraces.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
          </Field>
          <ErrorMessage name="subraceId" component="div" className="error" />
          <Field as="select" name="classId" aria-label="Class">
            {classes &&
              classes.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
          </Field>
          <ErrorMessage name="subraceId" component="div" className="error" />
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
            {isLoading ? 'Creating...' : 'Create'}
          </button>
          {error && <div className="error">{error}</div>}
        </Form>
      </Formik>
    </div>
  );
};

export default CharacterCreate;
