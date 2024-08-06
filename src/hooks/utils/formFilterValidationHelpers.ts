import { NewCharacter } from "../../types/DBTypes";

// Function to check non-null values for Barbarian
export const barbarianDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.barbarianBonusSkillProficiencyOne &&
    formValues.barbarianBonusSkillProficiencyTwo &&
    formValues.barbarianEquipmentOne &&
    formValues.barbarianEquipmentTwo
  );
};

// Function to check non-null values for Bard
export const bardDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.bardBonusSkillProficiencyOne &&
    formValues.bardBonusSkillProficiencyTwo &&
    formValues.bardBonusSkillProficiencyThree &&
    formValues.bardEquipmentOne &&
    formValues.bardEquipmentTwo &&
    formValues.bardEquipmentThree &&
    formValues.bardBonusMusicalProficiencyOne &&
    formValues.bardBonusMusicalProficiencyTwo &&
    formValues.bardBonusMusicalProficiencyThree &&
    formValues.bardBonusCantripIdOne &&
    formValues.bardBonusCantripIdTwo &&
    formValues.bardBonusSpellIdOne &&
    formValues.bardBonusSpellIdTwo &&
    formValues.bardBonusSpellIdThree &&
    formValues.bardBonusSpellIdFour
  );
};

// Function to check non-null values for Cleric
export const clericDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.clericSkillProficiencyOne &&
    formValues.clericSkillProficiencyTwo &&
    formValues.clericCantripIdOne &&
    formValues.clericCantripIdTwo &&
    formValues.clericCantripIdThree &&
    formValues.clericEquipmentOne &&
    formValues.clericEquipmentTwo &&
    formValues.clericEquipmentThree &&
    formValues.clericEquipmentFour
  );
};

// Function to check non-null values for Druid
export const druidDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.druidSkillProficiencyOne &&
    formValues.druidSkillProficiencyTwo &&
    formValues.druidEquipmentOne &&
    formValues.druidEquipmentTwo &&
    formValues.druidCantripIdOne &&
    formValues.druidCantripIdTwo &&
    formValues.druidSpellIdOne &&
    formValues.druidSpellIdTwo
  );
};

// Function to check non-null values for Fighter
export const fighterDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.fighterBonusSkillProficiencyOne &&
    formValues.fighterBonusSkillProficiencyTwo &&
    formValues.fighterEquipmentOne &&
    formValues.fighterEquipmentTwo &&
    formValues.fighterEquipmentThree &&
    formValues.fighterEquipmentFour &&
    formValues.fighterEquipmentFive &&
    formValues.fighterFightingStyle
  );
};

// Function to check non-null values for Monk
export const monkDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.monkSkillProficiencyOne &&
    formValues.monkSkillProficiencyTwo &&
    formValues.monkEquipmentOne &&
    formValues.monkEquipmentTwo &&
    formValues.monkProficiency
  );
};

// Function to check non-null values for Paladin
export const paladinDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.paladinBonusSkillProficiencyOne &&
    formValues.paladinBonusSkillProficiencyTwo &&
    formValues.paladinEquipmentOne &&
    formValues.paladinEquipmentTwo &&
    formValues.paladinEquipmentThree &&
    formValues.paladinEquipmentFour
  );
};

// Function to check non-null values for Ranger
export const rangerDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.rangerSkillProficiencyOne &&
    formValues.rangerSkillProficiencyTwo &&
    formValues.rangerSkillProficiencyThree &&
    formValues.rangerEquipmentOne &&
    formValues.rangerEquipmentTwo &&
    formValues.rangerEquipmentThree &&
    formValues.rangerBonusLanguageId
  );
};

// Function to check non-null values for Rogue
export const rogueDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.rogueSkillProficiencyOne &&
    formValues.rogueSkillProficiencyTwo &&
    formValues.rogueSkillProficiencyThree &&
    formValues.rogueSkillProficiencyFour &&
    formValues.rogueSkillProficiencyFive &&
    formValues.rogueEquipmentOne &&
    formValues.rogueEquipmentTwo &&
    formValues.rogueEquipmentThree
  );
};

// Function to check non-null values for Sorcerer
export const sorcererDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.sorcererSkillProficiencyOne &&
    formValues.sorcererSkillProficiencyTwo &&
    formValues.sorcererEquipmentOne &&
    formValues.sorcererEquipmentTwo &&
    formValues.sorcererEquipmentThree &&
    formValues.sorcererCantripIdOne &&
    formValues.sorcererCantripIdTwo &&
    formValues.sorcererCantripIdThree &&
    formValues.sorcererCantripIdFour &&
    formValues.sorcererCantripIdFive &&
    formValues.sorcererSpellIdOne &&
    formValues.sorcererSpellIdTwo
  );
};

// Function to check non-null values for Warlock
export const warlockDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.warlockSkillProficiencyOne &&
    formValues.warlockSkillProficiencyTwo &&
    formValues.warlockEquipmentOne &&
    formValues.warlockEquipmentTwo &&
    formValues.warlockEquipmentThree &&
    formValues.warlockCantripIdOne &&
    formValues.warlockCantripIdTwo &&
    formValues.warlockSpellIdOne &&
    formValues.warlockSpellIdTwo
  );
};

// Function to check non-null values for Wizard
export const wizardDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.wizardSkillProficiencyOne &&
    formValues.wizardSkillProficiencyTwo &&
    formValues.wizardEquipmentOne &&
    formValues.wizardEquipmentTwo &&
    formValues.wizardEquipmentThree &&
    formValues.wizardCantripIdOne &&
    formValues.wizardCantripIdTwo &&
    formValues.wizardCantripIdThree &&
    formValues.wizardSpellIdOne &&
    formValues.wizardSpellIdTwo &&
    formValues.wizardSpellIdThree &&
    formValues.wizardSpellIdFour &&
    formValues.wizardSpellIdFive &&
    formValues.wizardSpellIdSix
  );
};

// Function to check non-null values for Knowledge Domain
export const knowledgeDomainDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.knowledgeDomainSkillProficiencyOne &&
    formValues.knowledgeDomainSkillProficiencyTwo &&
    formValues.knowledgeDomainLanguageIdOne &&
    formValues.knowledgeDomainLanguageIdTwo
  );
};

// Function to check non-null values for Nature Domain
export const natureDomainDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.natureDomainSkillProficiency && formValues.natureDomainSpellIdOne
  );
};

// Function to check non-null values for Draconic Bloodline
export const draconicBloodlineDataNotNull = (formValues: NewCharacter) => {
  return formValues.draconicBloodlineAdvantage;
};

// Function to check non-null values for Dwarf
export const dwarfDataNotNull = (formValues: NewCharacter) => {
  return formValues.dwarfToolProficiency;
};

// Function to check non-null values for Half-Elf
export const halfElfDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.halfElfBonusSkillProficiencyTwo &&
    formValues.halfElfBonusLanguageId &&
    formValues.halfElfBonusAbilityScoreOne &&
    formValues.halfElfBonusAbilityScoreTwo
  );
};

// Function to check non-null values for Dragonborn
export const dragonbornDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.dragonbornBreathWeaponId && formValues.dragonbornResistanceType
  );
};

// Function to check non-null values for High-Elf
export const highElfDataNotNull = (formValues: NewCharacter) => {
  return formValues.highElfBonusCantripId && formValues.highElfBonusLanguageId;
};

// Function to check non-null values for Character
export const characterDataNotNull = (formValues: NewCharacter) => {
  return (
    formValues.characterAlignment &&
    formValues.characterIdealOne &&
    formValues.characterIdealTwo &&
    formValues.characterBondOne &&
    formValues.characterBondTwo &&
    formValues.characterFlawOne &&
    formValues.characterFlawTwo &&
    formValues.characterFearOne &&
    formValues.characterFearTwo
  );
};
