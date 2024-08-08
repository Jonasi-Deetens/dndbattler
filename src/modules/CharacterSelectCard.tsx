import React from "react";
import { Character } from "../types/DBTypes";

const CharacterSelectCard: React.FC<{ character: Character }> = ({
  character,
}) => {
  return (
    <div className="border-4 rounded-md drop-shadow-md border-red-400 p-5">
      <p className="text-xl">{character.name}</p>
      <hr className="my-2" />
      <section className="flex gap-x-4 text-left">
        <div>
          <ul className="text-sm">
            <li>HP: {character.stats.hp}</li>
            <li>Max HP: {character.stats.maxHp}</li>
            <li>Level: {character.stats.level}</li>
            <li>Armor Class: {character.stats.ac}</li>
          </ul>
        </div>
        <div>
          <ul className="text-sm">
            <li>STR: {character.stats.strength}</li>
            <li>DEX: {character.stats.dexterity}</li>
            <li>CON: {character.stats.constitution}</li>
            <li>INT: {character.stats.intelligence}</li>
            <li>WIS: {character.stats.wisdom}</li>
            <li>CHA: {character.stats.charisma}</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CharacterSelectCard;
