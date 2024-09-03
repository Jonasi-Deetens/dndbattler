import React from 'react';
import useCharacters from '../hooks/useCharacters';
import CharacterSelectCard from '../modules/CharacterSelectCard';
import AddCharacterButton from '../modules/AddCharacterButton';
import useAuth from '../hooks/useAuth';
import { BiSolidLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const CharacterSelect: React.FC = () => {
  const { characters } = useCharacters();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center bg-gray-800 w-full h-screen relative">
      {/* Character Cards Container */}
      <div className="flex flex-wrap gap-6 justify-center py-8 max-w-5xl mx-auto">
        {characters.length > 0 &&
          characters.map(character => (
            <CharacterSelectCard key={character.id} character={character} />
          ))}
        <AddCharacterButton />
        <button className="primary" onClick={() => navigate('/mapcreator')}>
          Create map
        </button>
      </div>

      {/* Logout Button */}
      <button className="fixed top-10 right-10 round-button" onClick={logout}>
        <BiSolidLogOut className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CharacterSelect;
