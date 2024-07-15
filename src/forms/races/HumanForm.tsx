import { ErrorMessage, Field, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { NewCharacter, Race } from '../../types/DBTypes';
import useLanguages from '../../hooks/useLanguages';
import useRaces from '../../hooks/useRaces';

const HumanForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { getRaceByName } = useRaces();
  const { languages } = useLanguages();
  const [race, setRace] = useState<Race>();

  useEffect(() => {
    const fetchRace = async () => {
      try {
        const race = await getRaceByName({ name: 'Human' });
        if (race) setRace(race);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRace();
  });

  return (
    <div>
      <h2 className="border p-2">HUMAN</h2>

      <p className="border-b p-2 w-fit m-auto">Select 1 extra language.</p>
      <Field
        as="select"
        name="humanBonusLanguageId"
        aria-label="HumanBonusLanguage"
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue('humanBonusLanguageId', e.target.value);
        }}
        value={values.humanBonusLanguageId}
      >
        {languages &&
          race &&
          languages
            .filter(language =>
              race.languages.every(lang => lang.name !== language.name)
            )
            .map(option => {
              return (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              );
            })}
      </Field>
      <ErrorMessage
        name="humanBonusLanguageId"
        component="div"
        className="error"
      />
    </div>
  );
};

export default HumanForm;
