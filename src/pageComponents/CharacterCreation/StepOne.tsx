import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import useRaces from '../../hooks/useRaces';
import useSubraces from '../../hooks/useSubraces';
import { NewCharacter } from '../../types/DBTypes';
import { FaFemale, FaMale } from 'react-icons/fa';
import useRaceImages from '../../hooks/useRaceImages';

const StepOne: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { races } = useRaces();
  const { subraces } = useSubraces();
  const [hasSubraces, setHasSubraces] = useState<boolean>(true);
  const { raceImages, subraceImages } = useRaceImages();

  useEffect(() => {
    if (races && races.length > 0 && !values.raceId)
      setFieldValue('raceId', races[0].id);
  }, [races, values.raceId, setFieldValue]);

  useEffect(() => {
    const matchingSubraces = subraces.filter(
      subrace => subrace.parentRaceId === values.raceId
    );
    setHasSubraces(matchingSubraces.length > 0);
    if (matchingSubraces.length > 0 && !values.subraceId) {
      setFieldValue('subraceId', matchingSubraces[0].id);
    }
  }, [subraces, values.raceId, values.subraceId, setFieldValue]);

  const handleGenderChange = (gender: 'male' | 'female') => {
    setFieldValue('gender', gender);
  };

  const handleRaceSelect = (raceId: number) => {
    setFieldValue('raceId', raceId);
    const matchingSubraces = subraces.filter(
      subrace => subrace.parentRaceId === raceId
    );
    setHasSubraces(matchingSubraces.length > 0);
    if (matchingSubraces.length > 0) {
      setFieldValue('subraceId', matchingSubraces[0].id);
    } else {
      setFieldValue('subraceId', undefined);
    }
  };

  const handleSubraceSelect = (subraceId: number) => {
    setFieldValue('subraceId', subraceId);
  };

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-center items-center gap-10">
        <button
          type="button"
          className={`p-2 rounded-full border-4 ${
            values.gender === 'male' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => handleGenderChange('male')}
        >
          <FaMale size={24} />
        </button>
        <button
          type="button"
          className={`p-2 rounded-full border-4 ${
            values.gender === 'female'
              ? 'bg-pink-500 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => handleGenderChange('female')}
        >
          <FaFemale size={24} />
        </button>
      </div>
      <h2 className="border p-2">Select your race</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {races &&
          races.map(race => (
            <div className="flex flex-col">
              <button
                key={race.id}
                type="button"
                onClick={() => handleRaceSelect(race.id)}
                className="flex justify-center items-center bg-transparent border-0 hover:!border-0 p-0 active:!scale-95"
              >
                <img
                  src={raceImages[race.id][values.gender as 'male' | 'female']}
                  alt={race.name}
                  className={`h-24 w-24 object-cover flex flex-col items-center shadow-sm rounded-md border-red-500 hover:border-4 transition-transform duration-150  ${
                    values.raceId === race.id
                      ? 'border-4 border-red-500 '
                      : 'border-0'
                  }`}
                />
              </button>
              <span className="mt-2">{race.name}</span>
            </div>
          ))}
      </div>
      {hasSubraces && (
        <div>
          <h2 className="border p-2 mb-5">Select your subrace</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {subraces &&
              subraces
                .filter(subrace => subrace.parentRaceId === values.raceId)
                .map(subrace => (
                  <div className="flex flex-col w-32">
                    <button
                      key={subrace.id}
                      type="button"
                      onClick={() => handleSubraceSelect(subrace.id)}
                      className="flex justify-center items-center bg-transparent border-0 hover:!border-0 p-0 active:!scale-95"
                    >
                      <img
                        src={
                          subraceImages[subrace.id][
                            values.gender as 'male' | 'female'
                          ]
                        }
                        alt={subrace.name}
                        className={`h-24 w-24 object-cover flex flex-col items-center shadow-sm rounded-md border-red-500 hover:border-4 transition-transform duration-150 ${
                          values.subraceId === subrace.id
                            ? 'border-4 border-red-500'
                            : 'border-0'
                        }`}
                      />
                    </button>
                    <span className="mt-2">{subrace.name}</span>
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepOne;
