import { ErrorMessage, Field, Form, Formik, FormikConfig } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import useCharacters from '../hooks/useCharacters';
import { Language, NewCharacter } from '../types/DBTypes';
import useRaces from '../hooks/useRaces';
import useSubraces from '../hooks/useSubraces';
import useClasses from '../hooks/useClasses';
import barbarian from '../assets/barbarian.webp';
import bard from '../assets/bard.webp';
import cleric from '../assets/cleric.webp';
import druid from '../assets/druid.webp';
import fighter from '../assets/fighter.webp';
import monk from '../assets/monk.webp';
import paladin from '../assets/paladin.webp';
import ranger from '../assets/ranger.webp';
import rogue from '../assets/rogue.webp';
import sorcerer from '../assets/sorcerer.webp';
import warlock from '../assets/necromancer.webp';
import wizard from '../assets/wizard.webp';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const useValidationSchema = () => {
  return yup.object().shape({
    name: yup.string().required('Please choose a name.'),
    background: yup.string().optional(),
    alignement: yup.string().optional(),
    classId: yup.number().required('Please select a class.'),
    raceId: yup.number().required('Please select a race.'),
    subraceId: yup.number().optional()
  });
};

const CharacterCreate: React.FC = () => {
  const navigate = useNavigate();
  const { handleAddCharacter } = useCharacters();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string | undefined>(barbarian);
  const [altText, setAltText] = useState<string | undefined>(
    'image of a barbarian on a pedestal'
  );
  const { races } = useRaces();
  const { subraces } = useSubraces();
  const { classes } = useClasses();
  const { user } = useAuth();

  const onSubmit: FormikConfig<NewCharacter>['onSubmit'] = useCallback(
    async values => {
      setIsLoading(true);
      try {
        await handleAddCharacter(values);
        navigate('/characterSelect');
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
        currentLocation: '',
        user: user,
        ideals: [],
        bonds: [],
        flaws: [],
        fears: [],
        savingThrows: [],
        magicSavingThrows: [],
        advantages: [],
        disadvantages: [],
        resistances: [],
        immunities: [],
        obstacles: [],
        internalConflicts: [],
        vices: [],
        skills: [],
        abilities: [],
        memberships: [],
        personalityTraits: [],
        appearance: '',
        items: [],
        spells: [],
        senses: [],
        race: null,
        class: null,
        age: 0,
        background: '',
        speed: 30,
        alignment: 'Neutral',
        primaryGoal: '',
        secondaryGoals: [],
        relationships: [],
        backstory: '',
        size: 'Medium',
        level: 1,
        experience: 0,
        health: 8,
        languages: [{ id: 1, name: 'common' } as Language],
        stats: {
          ac: 12,
          hp: 8,
          str: 1,
          dex: 1,
          con: 1,
          int: 1,
          wis: 1,
          cha: 1
        }
      },
      validationSchema: valSchema
    }),
    [onSubmit, valSchema]
  );

  const changeImage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case '1':
        setSource(barbarian);
        setAltText('image of a barbarian on a pedestal');
        break;
      case '2':
        setSource(bard);
        setAltText('image of a bard on a pedestal');
        break;
      case '3':
        setSource(cleric);
        setAltText('image of a cleric on a pedestal');
        break;
      case '4':
        setSource(druid);
        setAltText('image of a druid on a pedestal');
        break;
      case '5':
        setSource(fighter);
        setAltText('image of a fighter on a pedestal');
        break;
      case '6':
        setSource(monk);
        setAltText('image of a monk on a pedestal');
        break;
      case '7':
        setSource(paladin);
        setAltText('image of a paladin on a pedestal');
        break;
      case '8':
        setSource(ranger);
        setAltText('image of a ranger on a pedestal');
        break;
      case '9':
        setSource(rogue);
        setAltText('image of a rogue on a pedestal');
        break;
      case '10':
        setSource(sorcerer);
        setAltText('image of a sorcerer on a pedestal');
        break;
      case '11':
        setSource(warlock);
        setAltText('image of a warlock on a pedestal');
        break;
      case '12':
        setSource(wizard);
        setAltText('image of a wizard on a pedestal');
        break;
      default:
        setSource(barbarian);
        setAltText('image of a barbarian on a pedestal');
        break;
    }
  };

  return (
    <div className="bg-character-create h-screen w-full flex flex-col justify-center">
      <Formik<NewCharacter> {...formik} key={'character-create-formik'}>
        {({ values, setFieldValue }) => (
          <Form className="m-auto w-11/12 md:w-1/2 bg-slate-700 p-10 rounded-lg shadow-lg overflow-auto">
            <h2 className="mb-4 text-2xl">Character Creation</h2>
            <div className="flex flex-col md:flex-row gap-x-4 w-full">
              <div className="w-full md:w-1/2 p-5">
                <img src={source} alt={altText} />
              </div>
              <div className="flex flex-col gap-y-5 w-full md:w-1/2 p-5">
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  aria-label="Name"
                  autoComplete="name"
                  className="p-1 text-gray-500"
                />
                <ErrorMessage name="name" component="div" className="error" />
                <Field
                  as="select"
                  name="classId"
                  aria-label="Class"
                  className="p-1 text-gray-500"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    changeImage(e);
                    setFieldValue('classId', parseInt(e.target.value));
                  }}
                >
                  {classes &&
                    classes.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="classId"
                  component="div"
                  className="error"
                />
                <hr className="my-4" />
                <Field
                  as="select"
                  name="raceId"
                  aria-label="Race"
                  className="p-1 text-gray-500"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFieldValue('raceId', parseInt(e.target.value));
                    setFieldValue('subraceId', '');
                  }}
                >
                  {races &&
                    races.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                </Field>
                <ErrorMessage name="raceId" component="div" className="error" />
                <Field
                  as="select"
                  name="subraceId"
                  aria-label="Subrace"
                  className="p-1 text-gray-500"
                >
                  {subraces &&
                    subraces.map(option => {
                      if (option.parentRaceId === values.race?.id) {
                        return (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        );
                      }
                    })}
                </Field>
                <ErrorMessage
                  name="subraceId"
                  component="div"
                  className="error"
                />
                <hr className="my-4" />
                <Field
                  type="text"
                  name="background"
                  placeholder="Background"
                  aria-label="Background"
                  className="p-1 text-gray-500"
                />
                <ErrorMessage
                  name="background"
                  component="div"
                  className="error"
                />
                <Field
                  type="text"
                  name="alignment"
                  placeholder="Alignment"
                  aria-label="Alignment"
                  className="p-1 text-gray-500"
                />
                <ErrorMessage
                  name="alignment"
                  component="div"
                  className="error"
                />
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create'}
                </button>
                <button
                  className="bg-transparent"
                  onClick={() => {
                    navigate('/characterSelect');
                  }}
                >
                  &lt; back
                </button>
                {error && <div className="error">{error}</div>}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CharacterCreate;
