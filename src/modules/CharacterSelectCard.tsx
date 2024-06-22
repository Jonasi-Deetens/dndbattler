import React from 'react';
import { Character } from '../types/DBTypes';

const CharacterSelectCard: React.FC<{ character: Character }> = ({
  character
}) => {
  return (
    <div>
      <h1>{character.name}</h1>
    </div>
  );
};

export default CharacterSelectCard;
