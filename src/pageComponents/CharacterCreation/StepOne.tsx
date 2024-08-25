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
      <div className="flex justify-center items-center gap-4">
        <button
          type="button"
          className={`p-2 rounded-full border ${
            values.gender === 'male' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => handleGenderChange('male')}
        >
          <FaMale size={24} />
        </button>
        <button
          type="button"
          className={`p-2 rounded-full border ${
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
      <div className="flex flex-wrap w-full justify-center gap-4">
        {races &&
          races.map(race => (
            <div className="flex flex-col">
              <button
                key={race.id}
                type="button"
                onClick={() => handleRaceSelect(race.id)}
                className="bg-transparent border-0"
              >
                <img
                  src={raceImages[race.id][values.gender as 'male' | 'female']}
                  alt={race.name}
                  className={`h-24 w-24 object-cover flex flex-col items-center shadow-sm border-red-400 hover:border-4 hover:!scale-110 rounded-md ${
                    values.raceId === race.id
                      ? 'border-4 border-red-400 scale-110'
                      : 'border-0'
                  }`}
                />
              </button>
              <span>{race.name}</span>
            </div>
          ))}
      </div>
      {hasSubraces && (
        <div>
          <h2 className="border p-2 mb-5">Select your subrace</h2>
          <div className="flex justify-around w-full gap-4">
            {subraces &&
              subraces
                .filter(subrace => subrace.parentRaceId === values.raceId)
                .map(subrace => (
                  <div className="flex flex-col">
                    <button
                      key={subrace.id}
                      type="button"
                      onClick={() => handleSubraceSelect(subrace.id)}
                      className="bg-transparent border-0"
                    >
                      <img
                        src={
                          subraceImages[subrace.id][
                            values.gender as 'male' | 'female'
                          ]
                        }
                        alt={subrace.name}
                        className={`h-24 w-24 object-cover flex flex-col items-center shadow-sm border-red-400 hover:border-4 hover:!scale-110 rounded-md ${
                          values.subraceId === subrace.id
                            ? 'border-4 border-red-400 scale-110'
                            : 'border-0'
                        }`}
                      />
                    </button>
                    <span>{subrace.name}</span>
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepOne;
