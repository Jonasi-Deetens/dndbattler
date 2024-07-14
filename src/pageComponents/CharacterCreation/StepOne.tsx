import { ErrorMessage, Field, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import useRaces from '../../hooks/useRaces';
import useSubraces from '../../hooks/useSubraces';
import { Character } from '../../types/DBTypes';

const StepOne: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<Character>();
  const { races } = useRaces();
  const { subraces } = useSubraces();
  const [hasSubraces, setHasSubraces] = useState<boolean>(true);

  useEffect(() => {
    if (races && races.length > 0) setFieldValue('raceId', races[0].id);
  }, [races]);

  useEffect(() => {
    const matchingSubraces = subraces.filter(
      subrace => subrace.parentRaceId === values.raceId
    );

    setHasSubraces(matchingSubraces.length > 0);

    if (matchingSubraces.length === 1) {
      setFieldValue('subraceId', matchingSubraces[0].id);
    } else if (matchingSubraces.length === 0) {
      setFieldValue('subraceId', undefined);
    }
  }, [values.raceId, subraces, setFieldValue, races]);

  return (
    <div className="flex flex-col gap-y-5">
      <h2 className="border p-2">Select your race & subrace</h2>
      <Field
        as="select"
        name="raceId"
        aria-label="Race"
        className="p-1 text-gray-500"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue('raceId', parseInt(e.target.value));
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
      {hasSubraces && (
        <>
          <Field
            as="select"
            name="subraceId"
            aria-label="Subrace"
            className="p-1 text-gray-500"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFieldValue('subraceId', parseInt(e.target.value));
            }}
          >
            {subraces &&
              subraces.map(option => {
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
        </>
      )}
    </div>
  );
};

export default StepOne;
