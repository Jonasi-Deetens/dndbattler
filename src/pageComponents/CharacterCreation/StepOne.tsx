import { ErrorMessage, Field, useFormikContext } from "formik";
import React, { useEffect } from "react";
import useRaces from "../../hooks/useRaces";
import useSubraces from "../../hooks/useSubraces";
import { Character } from "../../types/DBTypes";

const StepOne: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<Character>();
  const { races } = useRaces();
  const { subraces } = useSubraces();

  useEffect(() => {
    const subrace = subraces.find(
      (subrace) => subrace.parentRaceId === values.raceId
    );

    if (subrace) setFieldValue("subraceId", subrace.id);
  }, [values, subraces, setFieldValue]);

  return (
    <div>
      <Field
        as="select"
        name="raceId"
        aria-label="Race"
        className="p-1 text-gray-500"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("raceId", parseInt(e.target.value));
        }}
      >
        {races &&
          races.map((option) => (
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
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("subraceId", parseInt(e.target.value));
        }}
      >
        {subraces &&
          subraces.map((option) => {
            if (option.parentRaceId === values.raceId) {
              return (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              );
            }
          })}
      </Field>
      <ErrorMessage name="subraceId" component="div" className="error" />
    </div>
  );
};

export default StepOne;
