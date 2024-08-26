import React, { useEffect, useState } from 'react';
import { Character } from '../types/DBTypes';
import useRaceImages from '../hooks/useRaceImages';

const CharacterSelectCard: React.FC<{ character: Character }> = ({
  character
}) => {
  const [raceImage, setRaceImage] = useState<string>();
  const { getImageByRaceAndGender } = useRaceImages();

  const handleCharacterDetails = ({ character }: { character: Character }) => {
    console.log(character.id);
    console.log(character.subraceId);
  };

  useEffect(() => {
    if (character.raceId && character.classId) {
      let rImage: string = '';
      if (character.subraceId) {
        rImage = getImageByRaceAndGender({
          raceId: character.raceId,
          subraceId: character.subraceId,
          gender: character.gender
        });
      } else
        rImage = getImageByRaceAndGender({
          raceId: character.raceId,
          gender: character.gender
        });
      setRaceImage(rImage);
    }
  }, []);

  return (
    <div className="flex flex-col text-gray-900 bg-red-400  border-2 shadow-lg shadow-black max-w-32 rounded-md border-black justify-between">
      {raceImage && (
        <img
          className="w-32 rounded-sm border-b-2 border-black"
          src={raceImage}
          alt=""
        />
      )}
      <p className="text-xl font-bold">{character.name}</p>
      <hr className="my-2 border-gray-900" />
      <p>Level: {character.stats.level}</p>
      <button
        key={character.id}
        type="button"
        onClick={() => handleCharacterDetails({ character: character })}
        className="flex justify-center items-center p-1 m-5 rounded-md bg-gray-900 border-0 hover:border-0 hover:underline active:!scale-95"
      >
        Details
      </button>
    </div>
  );
};

export default CharacterSelectCard;
