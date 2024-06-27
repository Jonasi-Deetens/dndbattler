import React from 'react';
import { Character } from '../types/DBTypes';

const CharacterSelectCard: React.FC<{ character: Character }> = ({
  character
}) => {
  return (
    <div>
      <p>{character.name}</p>
    </div>
  );
};

export default CharacterSelectCard;
