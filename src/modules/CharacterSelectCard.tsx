import React, { useEffect, useState } from 'react';
import { Character } from '../types/DBTypes';
import useRaceImages from '../hooks/useRaceImages';
import CharacterDetailsModal from './CharacterDetailsModal';
import { useNavigate } from 'react-router-dom';

const CharacterSelectCard: React.FC<{ character: Character }> = ({
  character
}) => {
  const [raceImage, setRaceImage] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getImageByRaceAndGender } = useRaceImages();
  const navigate = useNavigate();

  useEffect(() => {
    if (character.raceId && character.classId) {
      let rImage: string = '';
      if (character.subraceId) {
        rImage = getImageByRaceAndGender({
          raceId: character.raceId,
          subraceId: character.subraceId,
          gender: character.gender
        });
      } else {
        rImage = getImageByRaceAndGender({
          raceId: character.raceId,
          gender: character.gender
        });
      }
      setRaceImage(rImage);
    }
  }, [character, getImageByRaceAndGender]);

  return (
    <div className="flex flex-col items-center text-gray-900 bg-gray-800 border-2 shadow-lg max-w-sm rounded-lg border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out p-4">
      {raceImage && (
        <img
          className="w-24 h-24 rounded-full border-4 border-gray-700 mb-4 object-cover"
          src={raceImage}
          alt={`${character.name}`}
        />
      )}
      <p className="text-xl font-bold text-neutral-100 mb-2">
        {character.name}
      </p>
      <p className="text-neutral-300">
        <strong className="font-semibold text-neutral-100">Level:</strong>{' '}
        {character.stats.level}
      </p>
      <button
        key={character.id}
        type="button"
        onClick={() => navigate('/game')}
        className="primary w-full mt-4 px-4 py-2"
      >
        Play
      </button>
      <button
        key={character.id}
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="primary w-full mt-4 px-4 py-2"
      >
        View Details
      </button>

      {isModalOpen && (
        <CharacterDetailsModal
          character={character}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CharacterSelectCard;
