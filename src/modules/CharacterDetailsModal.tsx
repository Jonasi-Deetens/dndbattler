import React from 'react';
import { Character } from '../types/DBTypes';

const CharacterDetailsModal: React.FC<{
  character: Character;
  onClose: () => void;
}> = ({ character, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-red-400 border-4 rounded-3xl shadow-xl w-full max-w-4xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-900">
            {character.name}
          </h2>
          <button
            onClick={onClose}
            className="bg-gray-900 text-neutral-50 rounded-full w-12 h-12 flex items-center justify-center"
          >
            &times;
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold underline text-gray-900">
              Basic Info
            </h3>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Age:</strong>{' '}
              {character.age}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Gender:</strong>{' '}
              {character.gender}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Race:</strong>{' '}
              {character.race.name}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Class:</strong>{' '}
              {character.class.name}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Background:</strong>{' '}
              {character.background}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Alignment:</strong>{' '}
              {character.alignment}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Speed:</strong>{' '}
              {character.speed}
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-semibold underline text-gray-900">
              Abilities & Stats
            </h3>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Strength:</strong>{' '}
              {character.stats.strength}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Dexterity:</strong>{' '}
              {character.stats.dexterity}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">
                Constitution:
              </strong>{' '}
              {character.stats.constitution}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">
                Intelligence:
              </strong>{' '}
              {character.stats.intelligence}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Wisdom:</strong>{' '}
              {character.stats.wisdom}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Charisma:</strong>{' '}
              {character.stats.charisma}
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-semibold underline text-gray-900">
              Traits & Background
            </h3>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">
                Personality Traits:
              </strong>{' '}
              {character.personalityTraits.join(', ')}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Fears:</strong>{' '}
              {character.fears.join(', ')}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Ideals:</strong>{' '}
              {character.ideals.join(', ')}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Bonds:</strong>{' '}
              {character.bonds.join(', ')}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Flaws:</strong>{' '}
              {character.flaws.join(', ')}
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-semibold underline text-gray-900">
              Skills & Proficiencies
            </h3>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Skills:</strong>{' '}
              {character.skills.map(skill => skill.name).join(', ')}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Languages:</strong>{' '}
              {character.languages.map(lang => lang.name).join(', ')}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">
                Proficiencies:
              </strong>{' '}
              {character.proficiencies.join(', ')}
            </p>
          </div>

          <div className="space-y-1 md:col-span-2">
            <h3 className="text-xl font-semibold underline text-gray-900">
              Additional Info
            </h3>
            {character.secondaryGoals.length > 0 && (
              <p className="text-neutral-50">
                <strong className="font-medium text-gray-900">
                  Secondary Goals:
                </strong>{' '}
                {character.secondaryGoals.join(', ')}
              </p>
            )}
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">Backstory:</strong>{' '}
              {character.backstory}
            </p>
            <p className="text-neutral-50">
              <strong className="font-medium text-gray-900">
                Current Location:
              </strong>{' '}
              {character.currentLocation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailsModal;
