import { ErrorMessage, Field, Form, Formik, FormikConfig } from "formik";
import React, { useCallback, useMemo, useState } from "react";
import * as yup from "yup";
import useCharacters from "../../hooks/useCharacters";
import { Language, NewCharacter } from "../../types/DBTypes";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

const useValidationSchema = () => {
  return yup.object().shape({
    name: yup.string().required("Please choose a name."),
  });
};

const CharacterCreate: React.FC = () => {
  const navigate = useNavigate();
  const { handleAddCharacter } = useCharacters();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [step, setStep] = useState<number>(1);

  const onSubmit: FormikConfig<NewCharacter>["onSubmit"] = useCallback(
    async (values) => {
      setIsLoading(true);
      try {
        await handleAddCharacter(values);
        navigate("/characterSelect");
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
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
        name: "",
        fightingStyles: [],
        currentLocation: "",
        exhaustionLevel: 0,
        proficiencies: [],
        proficiencyBonus: 0,
        numberOfRages: 0,
        rageDamage: 0,
        kiPoints: 0,
        sorceryPoints: 0,
        sneakAttack: 0,
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
        appearance: "",
        items: [],
        spells: [],
        senses: [],
        age: 0,
        background: "",
        speed: 30,
        alignment: "Neutral",
        primaryGoal: "",
        secondaryGoals: [],
        relationships: [],
        backstory: "",
        size: "Medium",
        level: 1,
        experience: 0,
        health: 8,
        languages: [{ id: 1, name: "common" } as Language],
        stats: {
          ac: 12,
          hp: 8,
          str: 1,
          dex: 1,
          con: 1,
          int: 1,
          wis: 1,
          cha: 1,
        },
        raceId: 0,
        userId: user?.id || "",
        classId: 0,
      },
      validationSchema: valSchema,
    }),
    [onSubmit, valSchema, user?.id]
  );

  return (
    <div className="bg-character-create h-screen w-full flex flex-col justify-center">
      <Formik<NewCharacter> {...formik} key={"character-create-formik"}>
        <Form className="m-auto w-11/12 md:w-1/2 bg-slate-700 p-10 rounded-lg shadow-lg overflow-auto">
          <h2 className="mb-4 text-2xl">Character Creation</h2>
          <div className="flex flex-col md:flex-row gap-x-4 w-full">
            <div className="flex flex-col items-center m-auto gap-y-5 w-full p-5">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                aria-label="Name"
                autoComplete="name"
                className="p-1 text-gray-500"
              />
              <ErrorMessage name="name" component="div" className="error" />
              <hr className="my-4 w-full" />

              {step === 1 && <StepOne />}
              {step === 2 && <StepTwo />}
              {step === 3 && <StepThree />}
              {step === 4 && <StepFour />}
              {step === 5 && <StepFive />}

              <div className="flex gap-x-2">
                {step !== 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    disabled={isLoading}
                  >
                    Previous
                  </button>
                )}
                {step === 5 ? (
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    disabled={isLoading}
                  >
                    Next
                  </button>
                )}
              </div>
              <button
                type="button"
                className="bg-transparent"
                onClick={() => {
                  navigate("/characterSelect");
                }}
              >
                &lt; back
              </button>
              {error && <div className="error">{error}</div>}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CharacterCreate;
