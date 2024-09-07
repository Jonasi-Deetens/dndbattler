import { ErrorMessage, Form, Formik, FormikConfig } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import useCharacters from '../../hooks/useCharacters';
import { Language, NewCharacter } from '../../types/DBTypes';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';
import useFormFilter from '../../hooks/useFormFilter';
import CharacterSummary from './CharacterSummary';

const useValidationSchema = () => {
  return yup.object().shape({
    name: yup.string().required('Please choose a name.')
  });
};

const CharacterCreate: React.FC = () => {
  const navigate = useNavigate();
  const { handleAddCharacter } = useCharacters();
  const { getFormDataByClassAndRace } = useFormFilter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [step, setStep] = useState<number>(1);

  const onSubmit: FormikConfig<NewCharacter>['onSubmit'] = useCallback(
    async values => {
      setIsLoading(true);
      try {
        values = await getFormDataByClassAndRace(values);
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
    [handleAddCharacter, getFormDataByClassAndRace, navigate]
  );

  const valSchema = useValidationSchema();

  const formik: FormikConfig<NewCharacter> = useMemo(
    () => ({
      onSubmit,
      initialValues: {
        name: '',
        fightingStyles: [],
        currentLocation: '',
        exhaustionLevel: 0,
        proficiencies: [],
        proficiencyBonus: 0,
        numberOfRages: 0,
        rageDamage: 0,
        kiPoints: 0,
        sorceryPoints: 0,
        sneakAttack: '',
        invocationsKnown: 0,
        cantripsKnown: 0,
        spellsKnown: 0,
        spellSlots: [],
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
        age: 0,
        background: '',
        gender: 'male',
        speed: 30,
        alignment: 'Neutral',
        primaryGoal: '',
        secondaryGoals: [],
        relationships: [],
        backstory: '',
        size: 'Medium',
        languages: [{ id: 1, name: 'common' } as Language],
        stats: {
          ac: 12,
          hp: 8,
          maxHp: 8,
          level: 1,
          experience: 0,
          strength: 1,
          dexterity: 1,
          constitution: 1,
          intelligence: 1,
          wisdom: 1,
          charisma: 1
        },
        raceId: 0,
        userId: user?.id || '',
        classId: 0
      },
      validationSchema: valSchema
    }),
    [onSubmit, valSchema, user?.id]
  );

  return (
    <div className="min-h-screen py-10 w-full flex flex-col items-center">
      <Formik<NewCharacter> {...formik} key={'character-create-formik'}>
        <Form className="bg-gray-800 w-full max-w-4xl rounded-xl shadow-lg overflow-auto p-8">
          <h2 className="text-3xl font-bold border-yellow-500 text-yellow-500 border-b-2 text-center mb-8">
            Character Creation
          </h2>
          <div className="flex flex-col md:flex-row gap-x-6 w-full">
            {/* Character Summary Section */}
            <div className="flex flex-col items-center mb-5 w-full md:w-1/3">
              <CharacterSummary />
            </div>

            {/* Step Form Section */}
            <div className="w-full md:w-2/3 space-y-6">
              {step === 1 && <StepOne />}
              {step === 2 && <StepTwo />}
              {step === 3 && <StepThree />}
              {step === 4 && <StepFour />}
              {step === 5 && <StepFive />}

              <div className="w-full flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      setStep(step - 1);
                    }}
                    className="primary"
                    disabled={isLoading}
                  >
                    Previous
                  </button>
                )}
                {step < 5 ? (
                  <button
                    type="button"
                    className="primary ml-auto"
                    onClick={e => {
                      e.preventDefault();
                      setStep(step + 1);
                    }}
                    disabled={isLoading}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="primary !bg-green-500 font-bold hover:!bg-green-400 active:!bg-green-600 ml-auto"
                  >
                    {isLoading ? 'Creating...' : 'Create'}
                  </button>
                )}
              </div>
            </div>
          </div>
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-sm mt-4"
          />
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </Form>
      </Formik>

      <button
        type="button"
        className="nav-button mt-4"
        onClick={() => {
          navigate('/characterSelect');
        }}
      >
        &lt; Back to Character Select
      </button>
    </div>
  );
};

export default CharacterCreate;
