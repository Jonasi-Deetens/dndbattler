import React from 'react';
import useCharacters from '../hooks/useCharacters';
import CharacterSelectCard from '../modules/CharacterSelectCard';
import AddCharacterButton from '../modules/AddCharacterButton';

const CharacterSelect: React.FC = () => {
  const { characters } = useCharacters();

  return (
    <div className="flex justify-center items-center bg-gray-800 w-full h-screen">
      <div className="flex m-auto">
        {characters.length &&
          characters.map(character => (
            <CharacterSelectCard character={character} />
          ))}
        <AddCharacterButton />
      </div>
    </div>
  );
};

export default CharacterSelect;
