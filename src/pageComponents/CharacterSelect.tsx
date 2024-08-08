import React from "react";
import useCharacters from "../hooks/useCharacters";
import CharacterSelectCard from "../modules/CharacterSelectCard";
import AddCharacterButton from "../modules/AddCharacterButton";
import useAuth from "../hooks/useAuth";

const CharacterSelect: React.FC = () => {
  const { characters } = useCharacters();
  const { logout } = useAuth();
  console.log(characters);

  return (
    <div className="flex justify-center items-center bg-gray-800 w-full h-screen">
      <div className="flex gap-x-4 m-auto">
        {characters.length > 0 &&
          characters.map((character) => (
            <CharacterSelectCard key={character.id} character={character} />
          ))}
        <AddCharacterButton />
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default CharacterSelect;
