import React, { useEffect, useState } from 'react';
import { Character } from '../types/DBTypes';
import useRaceImages from '../hooks/useRaceImages';
import useClassImages from '../hooks/useClassImages';

const CharacterDetailsModal: React.FC<{
  character: Character;
  onClose: () => void;
}> = ({ character, onClose }) => {
  const { getImageByRaceAndGender } = useRaceImages();
  const { getImageByClass } = useClassImages();
  const [raceImage, setRaceImage] = useState<string>();
  const [classImage, setClassImage] = useState<string>();

  useEffect(() => {
    const fetchRaceImage = () => {
      let image = '';
      if (character.subraceId) {
        image = getImageByRaceAndGender({
          raceId: character.raceId,
          subraceId: character.subraceId,
          gender: character.gender
        });
      } else {
        image = getImageByRaceAndGender({
          raceId: character.raceId,
          gender: character.gender
        });
      }
      setRaceImage(image);
    };

    const fetchClassImage = () => {
      let image = '';
      if (character.subclassId) {
        image = getImageByClass({
          classId: character.classId,
          subclassId: character.subclassId
        });
      } else {
        image = getImageByClass({
          classId: character.classId
        });
      }
      setClassImage(image);
    };

    fetchRaceImage();
    fetchClassImage();
  }, [character, getImageByRaceAndGender, getImageByClass]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl w-full max-w-4xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <h2 className="text-3xl font-bold text-yellow-400">
            {character.name}
          </h2>
          <button onClick={onClose} className="round-button">
            &times;
          </button>
        </div>

        {/* Images and Basic Info */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 text-neutral-300">
          <div className="flex flex-col items-center">
            {raceImage && (
              <img
                className="w-32 h-32 mb-4 border-4 border-yellow-500 rounded-full object-cover shadow-lg"
                src={raceImage}
                alt={`${character.race.name} Image`}
              />
            )}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-neutral-100">
                {character.subrace?.name || character.race.name}
              </h3>
              <p className="text-sm text-neutral-400">
                {character.subrace?.description || character.race.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            {classImage && (
              <img
                className="w-32 h-32 mb-4 border-4 border-yellow-500 rounded-full object-cover shadow-lg"
                src={classImage}
                alt={`${character.class.name} Image`}
              />
            )}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-neutral-100">
                {character.subclass?.name || character.class.name}
              </h3>
              <p className="text-sm text-neutral-400">
                {character.subclass?.description || character.class.description}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info Sections */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 text-neutral-300">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-neutral-100">Basic Info</h3>
            <div className="space-y-1">
              <p>
                <strong className="text-yellow-400">Age:</strong>{' '}
                {character.age}
              </p>
              <p>
                <strong className="text-yellow-400">Gender:</strong>{' '}
                {character.gender}
              </p>
              <p>
                <strong className="text-yellow-400">Race:</strong>{' '}
                {character.race.name}
              </p>
              <p>
                <strong className="text-yellow-400">Class:</strong>{' '}
                {character.class.name}
              </p>
              <p>
                <strong className="text-yellow-400">Background:</strong>{' '}
                {character.background}
              </p>
              <p>
                <strong className="text-yellow-400">Alignment:</strong>{' '}
                {character.alignment}
              </p>
              <p>
                <strong className="text-yellow-400">Speed:</strong>{' '}
                {character.speed} ft
              </p>
            </div>
          </div>

          {/* Abilities & Stats */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-neutral-100">
              Abilities & Stats
            </h3>
            <div className="space-y-1">
              <p>
                <strong className="text-yellow-400">Strength:</strong>{' '}
                {character.stats.strength}
              </p>
              <p>
                <strong className="text-yellow-400">Dexterity:</strong>{' '}
                {character.stats.dexterity}
              </p>
              <p>
                <strong className="text-yellow-400">Constitution:</strong>{' '}
                {character.stats.constitution}
              </p>
              <p>
                <strong className="text-yellow-400">Intelligence:</strong>{' '}
                {character.stats.intelligence}
              </p>
              <p>
                <strong className="text-yellow-400">Wisdom:</strong>{' '}
                {character.stats.wisdom}
              </p>
              <p>
                <strong className="text-yellow-400">Charisma:</strong>{' '}
                {character.stats.charisma}
              </p>
            </div>
          </div>

          {/* Traits & Background */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-neutral-100">
              Traits & Background
            </h3>
            <div className="space-y-1">
              <p>
                <strong className="text-yellow-400">Personality Traits:</strong>{' '}
                {character.personalityTraits.join(', ')}
              </p>
              <p>
                <strong className="text-yellow-400">Fears:</strong>{' '}
                {character.fears.join(', ')}
              </p>
              <p>
                <strong className="text-yellow-400">Ideals:</strong>{' '}
                {character.ideals.join(', ')}
              </p>
              <p>
                <strong className="text-yellow-400">Bonds:</strong>{' '}
                {character.bonds.join(', ')}
              </p>
              <p>
                <strong className="text-yellow-400">Flaws:</strong>{' '}
                {character.flaws.join(', ')}
              </p>
            </div>
          </div>

          {/* Skills & Proficiencies */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-neutral-100">
              Skills & Proficiencies
            </h3>
            <div className="space-y-1">
              <p>
                <strong className="text-yellow-400">Skills:</strong>{' '}
                {character.skills.map(skill => skill.name).join(', ')}
              </p>
              <p>
                <strong className="text-yellow-400">Languages:</strong>{' '}
                {character.languages.map(lang => lang.name).join(', ')}
              </p>
              <p>
                <strong className="text-yellow-400">Proficiencies:</strong>{' '}
                {character.proficiencies.join(', ')}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-xl font-bold text-neutral-100">
              Additional Info
            </h3>
            {character.secondaryGoals.length > 0 && (
              <p>
                <strong className="text-yellow-400">Secondary Goals:</strong>{' '}
                {character.secondaryGoals.join(', ')}
              </p>
            )}
            <p>
              <strong className="text-yellow-400">Backstory:</strong>{' '}
              {character.backstory}
            </p>
            <p>
              <strong className="text-yellow-400">Current Location:</strong>{' '}
              {character.currentLocation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailsModal;
