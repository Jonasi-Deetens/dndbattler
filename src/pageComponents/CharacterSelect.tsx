import React from 'react';
import useCharacters from '../hooks/useCharacters';
import CharacterSelectCard from '../modules/CharacterSelectCard';
import AddCharacterButton from '../modules/AddCharacterButton';
import useAuth from '../hooks/useAuth';
import { BiSolidLogOut } from 'react-icons/bi';

const CharacterSelect: React.FC = () => {
  const { characters } = useCharacters();
  const { logout } = useAuth();
  console.log(characters);

  return (
    <div className="flex justify-center items-center bg-gray-800 w-full h-screen">
      <div className="flex flex-wrap gap-x-2 gap-y-2 m-auto">
        {characters.length > 0 &&
          characters.map(character => (
            <CharacterSelectCard key={character.id} character={character} />
          ))}
        <AddCharacterButton />
      </div>
      <button
        className="fixed top-10 right-10 m-0 p-0 rounded-full w-10 h-10 flex items-center justify-center"
        onClick={logout}
      >
        <BiSolidLogOut className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CharacterSelect;
