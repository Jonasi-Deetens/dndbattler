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

  // Set initial race on component load
  useEffect(() => {
    if (races && races.length > 0 && !values.raceId) {
      setFieldValue('raceId', races[0].id);
    }
  }, [races, values.raceId, setFieldValue]);

  // Update subraces based on selected race
  useEffect(() => {
    const matchingSubraces = subraces.filter(
      subrace => subrace.parentRaceId === values.raceId
    );
    setHasSubraces(matchingSubraces.length > 0);
    if (matchingSubraces.length > 0 && !values.subraceId) {
      setFieldValue('subraceId', matchingSubraces[0].id);
    }
  }, [subraces, values.raceId, values.subraceId, setFieldValue]);

  // Gender selection handler
  const handleGenderChange = (gender: 'male' | 'female') => {
    setFieldValue('gender', gender);
  };

  // Race selection handler
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

  // Subrace selection handler
  const handleSubraceSelect = (subraceId: number) => {
    setFieldValue('subraceId', subraceId);
  };

  return (
    <div className="flex flex-col gap-y-8 items-center">
      {/* Gender Selection */}
      <div className="flex justify-center items-center gap-6">
        <button
          type="button"
          className={`p-4 rounded-full w-14 h-14 border-4 flex items-center justify-center transition-colors duration-300 ${
            values.gender === 'male' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          } hover:bg-blue-400 active:bg-blue-600`}
          onClick={() => handleGenderChange('male')}
        >
          <FaMale size={28} />
        </button>
        <button
          type="button"
          className={`p-4 rounded-full w-14 h-14 border-4 flex items-center justify-center transition-colors duration-300 ${
            values.gender === 'female'
              ? 'bg-pink-500 text-white'
              : 'bg-gray-200'
          } hover:bg-pink-400 active:bg-pink-600`}
          onClick={() => handleGenderChange('female')}
        >
          <FaFemale size={28} />
        </button>
      </div>

      {/* Race Selection */}
      <h2 className="text-2xl font-semibold text-yellow-500 text-center border-b-2 border-yellow-500 pb-2">
        Select your race
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {races &&
          races.map(race => (
            <div key={race.id} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => handleRaceSelect(race.id)}
                className={`flex justify-center items-center bg-transparent border-0 active:scale-95 transition-transform duration-150`}
              >
                <img
                  src={raceImages[race.id][values.gender as 'male' | 'female']}
                  alt={race.name}
                  className={`h-24 w-24 object-cover shadow-sm rounded-md transition-transform duration-150 ${
                    values.raceId === race.id
                      ? 'border-4 border-yellow-500 transform scale-105'
                      : 'border border-gray-700'
                  }`}
                />
              </button>
              <span className="mt-2 text-neutral-100">{race.name}</span>
            </div>
          ))}
      </div>

      {/* Subrace Selection */}
      {hasSubraces && (
        <div>
          <h2 className="text-2xl font-semibold text-yellow-500 text-center border-b-2 border-yellow-500 pb-2 mb-8">
            Select your subrace
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {subraces &&
              subraces
                .filter(subrace => subrace.parentRaceId === values.raceId)
                .map(subrace => (
                  <div key={subrace.id} className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => handleSubraceSelect(subrace.id)}
                      className={`flex justify-center items-center bg-transparent border-0 active:scale-95 transition-transform duration-150`}
                    >
                      <img
                        src={
                          subraceImages[subrace.id][
                            values.gender as 'male' | 'female'
                          ]
                        }
                        alt={subrace.name}
                        className={`h-24 w-24 object-cover shadow-sm rounded-md transition-transform duration-150 ${
                          values.subraceId === subrace.id
                            ? 'border-4 border-yellow-500 transform scale-105'
                            : 'border border-gray-700'
                        }`}
                      />
                    </button>
                    <span className="mt-2 text-neutral-100">
                      {subrace.name}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepOne;
