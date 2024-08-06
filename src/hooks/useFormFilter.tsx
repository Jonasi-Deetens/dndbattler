import { useCallback } from "react";
import useClasses from "./useClasses";
import useRaces from "./useRaces";
import useSubclasses from "./useSubclasses";
import useSubraces from "./useSubraces";
import {
  Class,
  FightingStyle,
  NewCharacter,
  Race,
  Subclass,
  Subrace,
} from "../types/DBTypes";
import useSpells from "./useSpells";
import useLanguages from "./useLanguages";
import useAbilities from "./useAbilities";
import useSkills from "./useSkills";
import useItems from "./useItems";
import {
  addAbilitiesByName,
  addItems,
  addItemsByName,
  addLanguageById,
  addLanguagesById,
  addSkillsByName,
  addSpellById,
  addSpellsById,
  addUniqueAdvantages,
  addUniqueDisadvantages,
  addUniqueLanguages,
  addUniqueMagicSavingThrows,
  addUniqueProficiencies,
  addUniqueResistances,
  addUniqueSavingThrows,
  addUniqueSenses,
  addUniqueSkills,
  addUniqueSpells,
  addUniqueSpellsByName,
  applyAbilityScoreIncreases,
  applyStatIncreases,
} from "./utils/formFilterHelpers";
import {
  barbarianDataNotNull,
  bardDataNotNull,
  characterDataNotNull,
  clericDataNotNull,
  draconicBloodlineDataNotNull,
  druidDataNotNull,
  fighterDataNotNull,
  knowledgeDomainDataNotNull,
  monkDataNotNull,
  natureDomainDataNotNull,
  paladinDataNotNull,
  rangerDataNotNull,
  rogueDataNotNull,
  sorcererDataNotNull,
  warlockDataNotNull,
  wizardDataNotNull,
} from "./utils/formFilterValidationHelpers";

const useFormFilter = () => {
  const { getClassById } = useClasses();
  const { getSubclassById } = useSubclasses();
  const { getRaceById } = useRaces();
  const { getSubraceById } = useSubraces();
  const { spells } = useSpells();
  const { languages } = useLanguages();
  const { abilities } = useAbilities();
  const { skills } = useSkills();
  const { items } = useItems();

  const getFormDataByClassAndRace = useCallback(
    async (formData: NewCharacter) => {
      try {
        const classData = await getClassById({ id: formData.classId });
        const subclassData = formData.subclassId
          ? await getSubclassById({ id: formData.subclassId })
          : null;
        const raceData = await getRaceById({ id: formData.raceId });
        const subraceData = formData.subraceId
          ? await getSubraceById({ id: formData.subraceId })
          : null;
        console.log(formData);
        const formValues: NewCharacter = {
          name: formData.name,
          fightingStyles: [],
          exhaustionLevel: 0,
          currentLocation: formData.currentLocation,
          numberOfRages: 0,
          rageDamage: 0,
          kiPoints: 0,
          sorceryPoints: 0,
          sneakAttack: 0,
          invocationsKnown: 0,
          cantripsKnown: 0,
          spellsKnown: 0,
          ideals: [],
          bonds: [],
          flaws: [],
          fears: [],
          savingThrows: [],
          magicSavingThrows: [],
          advantages: [],
          disadvantages: [],
          resistances: [],
          spellSlots: [],
          immunities: [],
          obstacles: [],
          internalConflicts: [],
          vices: [],
          skills: [],
          abilities: [],
          memberships: [],
          personalityTraits: [],
          appearance: "",
          items: [],
          spells: [],
          senses: [],
          age: 0,
          background: "",
          speed: 30,
          alignment: "Lawful Good",
          primaryGoal: "",
          secondaryGoals: [],
          relationships: [],
          backstory: "",
          size: "Medium",
          level: 1,
          experience: 0,
          health: 8,
          proficiencyBonus: 0,
          languages: [languages && languages[0]],
          stats: {
            AC: 12,
            HP: 8,
            STR: 1,
            DEX: 1,
            CON: 1,
            INT: 1,
            WIS: 1,
            CHA: 1,
          },
          raceId: formData.raceId,
          userId: formData.userId,
          classId: formData.classId,
          subclassId: formData.subclassId,
          proficiencies: [],
        };

        classData
          ? getClassSpecificValues(classData, formData, formValues)
          : {};
        subclassData
          ? getSubclassSpecificValues(subclassData, formData, formValues)
          : {};
        raceData ? getRaceSpecificValues(raceData, formData, formValues) : {};
        subraceData
          ? getSubraceSpecificValues(subraceData, formData, formValues)
          : {};
        getBackgroundSpecificValues(formData, formValues);

        return formValues;
      } catch (error) {
        console.error(error);
      }
      return formData;
    },
    [getClassById, getSubclassById, getRaceById, getSubraceById]
  );

  const getClassSpecificValues = (
    charClass: Class,
    formData: NewCharacter,
    formValues: NewCharacter
  ) => {
    formValues.proficiencyBonus = JSON.parse(
      charClass.proficiencyBonusByLevel
    )[1];
    formValues.spellSlots = JSON.parse(charClass.spellSlotsByLevel)[1];
    if (charClass.items) addItems(charClass.items, formValues);
    addUniqueSavingThrows(charClass.savingThrowProficiencies, formValues);
    addUniqueProficiencies(charClass.proficiencies, formValues);
    if (charClass.spellsByLevel)
      addUniqueSpellsByName(
        JSON.parse(charClass.spellsByLevel)[1],
        formValues,
        spells
      );
    addAbilitiesByName(
      JSON.parse(charClass.abilitiesByLevel)[1],
      formValues,
      abilities
    );
    addSkillsByName(JSON.parse(charClass.skillsByLevel)[1], formValues, skills);
    formValues.primaryAbilityScoreModifier =
      charClass.primarySpellAbilityScoreModifier;
    formValues.primarySpellAbilityScoreModifier =
      charClass.primarySpellAbilityScoreModifier;
    if (JSON.parse(charClass.movementSpeedBonusByLevel)[1])
      formValues.speed += parseInt(
        JSON.parse(charClass.movementSpeedBonusByLevel)[1]
      );
    formValues.exhaustionLevel = charClass.exhaustionLevel;
    formValues.cantripsKnown = JSON.parse(charClass.cantripsKnownByLevel)[1];
    formValues.spellsKnown = JSON.parse(charClass.spellsKnownByLevel)[1];

    switch (charClass.name) {
      case "Barbarian":
        console.log("Barbarian");
        if (charClass.numberOfRagesByLevel)
          formValues.numberOfRages = JSON.parse(
            charClass.numberOfRagesByLevel
          )[1];
        if (charClass.rageDamageByLevel)
          formValues.rageDamage = JSON.parse(charClass.rageDamageByLevel)[1];
        if (barbarianDataNotNull(formData)) {
          console.log("Barbarian data");
          addUniqueProficiencies(
            [
              formData.barbarianBonusSkillProficiencyOne!,
              formData.barbarianBonusSkillProficiencyTwo!,
            ],
            formValues
          );
          const chosenItems = [
            formData.barbarianEquipmentOne!,
            formData.barbarianEquipmentTwo!,
          ];
          if (formData.barbarianEquipmentTwo === "Handaxe")
            chosenItems.push("Handaxe");
          addItemsByName(chosenItems, formValues, items);
        }
        return { formValues };
      case "Bard":
        if (bardDataNotNull(formData)) {
          addUniqueProficiencies(
            [
              formData.bardBonusSkillProficiencyOne!,
              formData.bardBonusSkillProficiencyTwo!,
              formData.bardBonusSkillProficiencyThree!,
            ],
            formValues
          );
          const chosenItems = [
            formData.bardEquipmentOne!,
            formData.bardEquipmentTwo!,
            formData.bardEquipmentThree!,
          ];
          addItemsByName(chosenItems, formValues, items);
          addUniqueProficiencies(
            [
              formData.bardBonusMusicalProficiencyOne!,
              formData.bardBonusMusicalProficiencyTwo!,
              formData.bardBonusMusicalProficiencyThree!,
            ],
            formValues
          );
          addSpellsById(
            [
              formData.bardBonusCantripIdOne!,
              formData.bardBonusCantripIdTwo!,
              formData.bardBonusSpellIdOne!,
              formData.bardBonusSpellIdTwo!,
              formData.bardBonusSpellIdThree!,
              formData.bardBonusSpellIdFour!,
            ],
            formValues,
            spells
          );
        }
        return { formValues };
      case "Cleric":
        if (clericDataNotNull(formData)) {
          addUniqueProficiencies(
            [
              formData.clericSkillProficiencyOne!,
              formData.clericSkillProficiencyTwo!,
            ],
            formValues
          );
          const chosenItems = [
            formData.clericEquipmentOne!,
            formData.clericEquipmentTwo!,
            formData.clericEquipmentThree!,
            formData.clericEquipmentFour!,
          ];
          addItemsByName(chosenItems, formValues, items);
          addSpellsById(
            [
              formData.clericCantripIdOne!,
              formData.clericCantripIdTwo!,
              formData.clericCantripIdThree!,
            ],
            formValues,
            spells
          );
        }
        return { formValues };
      case "Druid":
        if (druidDataNotNull(formData)) {
          addUniqueProficiencies(
            [
              formData.druidSkillProficiencyOne!,
              formData.druidSkillProficiencyTwo!,
            ],
            formValues
          );
          const chosenItems = [
            formData.druidEquipmentOne!,
            formData.druidEquipmentTwo!,
          ];
          addItemsByName(chosenItems, formValues, items);
          addSpellsById(
            [
              formData.druidCantripIdOne!,
              formData.druidCantripIdTwo!,
              formData.druidSpellIdOne!,
              formData.druidSpellIdTwo!,
            ],
            formValues,
            spells
          );
        }
        return { formValues };
      case "Fighter":
        if (fighterDataNotNull(formData)) {
          addUniqueProficiencies(
            [
              formData.fighterBonusSkillProficiencyOne!,
              formData.fighterBonusSkillProficiencyTwo!,
            ],
            formValues
          );
          const chosenItems = [
            formData.fighterEquipmentOne!,
            formData.fighterEquipmentTwo!,
            formData.fighterEquipmentThree!,
            formData.fighterEquipmentFour!,
            formData.fighterEquipmentFive!,
          ];
          addItemsByName(chosenItems, formValues, items);
          formValues.fightingStyles.push(
            formData.fighterFightingStyle! as FightingStyle
          );
        }
        return { formValues };
      case "Monk":
        if (charClass.kiPointsByLevel)
          formValues.kiPoints = JSON.parse(charClass.kiPointsByLevel)[1];
        if (monkDataNotNull(formData)) {
          addUniqueProficiencies(
            [
              formData.monkSkillProficiencyOne!,
              formData.monkSkillProficiencyTwo!,
              formData.monkProficiency!,
            ],
            formValues
          );
          const chosenItems = [
            formData.monkEquipmentOne!,
            formData.monkEquipmentTwo!,
          ];
          addItemsByName(chosenItems, formValues, items);
        }
        return { formValues };
      case "Paladin":
        if (paladinDataNotNull(formData)) {
          addUniqueProficiencies(
            [
              formData.paladinBonusSkillProficiencyOne!,
              formData.paladinBonusSkillProficiencyTwo!,
            ],
            formValues
          );
          const chosenItems = [
            formData.paladinEquipmentOne!,
            formData.paladinEquipmentTwo!,
            formData.paladinEquipmentThree!,
            formData.paladinEquipmentFour!,
          ];
          addItemsByName(chosenItems, formValues, items);
        }
        return { formValues };
      case "Ranger":
        if (rangerDataNotNull(formData)) {
          addUniqueProficiencies(
            [
              formData.rangerSkillProficiencyOne!,
              formData.rangerSkillProficiencyTwo!,
              formData.rangerSkillProficiencyThree!,
            ],
            formValues
          );
          const chosenItems = [
            formData.rangerEquipmentOne!,
            formData.rangerEquipmentTwo!,
            formData.rangerEquipmentThree!,
          ];
          addItemsByName(chosenItems, formValues, items);
          addLanguageById(
            formData.rangerBonusLanguageId!,
            formValues,
            languages
          );
        }
        return { formValues };
      case "Rogue":
        if (charClass.sneakAttackByLevel)
          formValues.sneakAttack = JSON.parse(charClass.sneakAttackByLevel)[1];
        if (rogueDataNotNull(formData)) {
          addUniqueProficiencies(
            [
              formData.rogueSkillProficiencyOne!,
              formData.rogueSkillProficiencyTwo!,
              formData.rogueSkillProficiencyThree!,
              formData.rogueSkillProficiencyFour!,
              formData.rogueSkillProficiencyFive!,
            ],
            formValues
          );
          const chosenItems = [
            formData.rogueEquipmentOne!,
            formData.rogueEquipmentTwo!,
            formData.rogueEquipmentThree!,
          ];
          addItemsByName(chosenItems, formValues, items);
        }
        return { formValues };
      case "Sorcerer":
        if (charClass.sorceryPointsByLevel)
          formValues.sorceryPoints = JSON.parse(
            charClass.sorceryPointsByLevel[1]
          );
        if (sorcererDataNotNull(formData)) {
          addUniqueProficiencies(
            [
              formData.sorcererSkillProficiencyOne!,
              formData.sorcererSkillProficiencyTwo!,
            ],
            formValues
          );
          const chosenItems = [
            formData.sorcererEquipmentOne!,
            formData.sorcererEquipmentTwo!,
            formData.sorcererEquipmentThree!,
          ];
          addItemsByName(chosenItems, formValues, items);
          addSpellsById(
            [
              formData.sorcererCantripIdOne!,
              formData.sorcererCantripIdTwo!,
              formData.sorcererCantripIdThree!,
              formData.sorcererCantripIdFour!,
              formData.sorcererCantripIdFive!,
              formData.sorcererSpellIdOne!,
              formData.sorcererSpellIdTwo!,
            ],
            formValues,
            spells
          );
        }
        return { formValues };
      case "Warlock":
        if (charClass.invocationsKnownByLevel)
          formValues.invocationsKnown = JSON.parse(
            charClass.invocationsKnownByLevel[1]
          );
        if (warlockDataNotNull(formData)) {
          addUniqueProficiencies(
            [
              formData.warlockSkillProficiencyOne!,
              formData.warlockSkillProficiencyTwo!,
            ],
            formValues
          );
          const chosenItems = [
            formData.warlockEquipmentOne!,
            formData.warlockEquipmentTwo!,
            formData.warlockEquipmentThree!,
          ];
          addItemsByName(chosenItems, formValues, items);
          addSpellsById(
            [
              formData.warlockCantripIdOne!,
              formData.warlockCantripIdTwo!,
              formData.warlockSpellIdOne!,
              formData.warlockSpellIdTwo!,
            ],
            formValues,
            spells
          );
        }
        return { formValues };
      case "Wizard":
        if (wizardDataNotNull(formData)) {
          addUniqueProficiencies(
            [
              formData.wizardSkillProficiencyOne!,
              formData.wizardSkillProficiencyTwo!,
            ],
            formValues
          );
          const chosenItems = [
            formData.wizardEquipmentOne!,
            formData.wizardEquipmentTwo!,
            formData.wizardEquipmentThree!,
          ];
          addItemsByName(chosenItems, formValues, items);
          addSpellsById(
            [
              formData.wizardCantripIdOne!,
              formData.wizardCantripIdTwo!,
              formData.wizardCantripIdThree!,
              formData.wizardSpellIdOne!,
              formData.wizardSpellIdTwo!,
              formData.wizardSpellIdThree!,
              formData.wizardSpellIdFour!,
              formData.wizardSpellIdFive!,
              formData.wizardSpellIdSix!,
            ],
            formValues,
            spells
          );
        }
        return { formValues };
      default:
        return { formValues };
    }
  };

  const getSubclassSpecificValues = (
    subclass: Subclass,
    formData: NewCharacter,
    formValues: NewCharacter
  ) => {
    formValues.spellSlots = subclass.spellslotsBySpellLevelByLevel
      ? JSON.parse(subclass.spellslotsBySpellLevelByLevel)[1]
      : [];
    addUniqueSavingThrows(subclass.savingThrowProficiencies, formValues);
    addUniqueProficiencies(subclass.proficiencies, formValues);
    formValues.primarySpellAbilityScoreModifier =
      subclass.primarySpellAbilityScoreModifier;
    formValues.cantripsKnown = subclass.cantripsKnownByLevel
      ? JSON.parse(subclass.cantripsKnownByLevel)[1]
      : 0;
    formValues.spellsKnown = subclass.spellsKnownByLevel
      ? JSON.parse(subclass.spellsKnownByLevel)[1]
      : 0;
    addUniqueSpellsByName(
      JSON.parse(subclass.spellsByLevel)[1],
      formValues,
      spells
    );
    addAbilitiesByName(
      JSON.parse(subclass.abilitiesByLevel)[1],
      formValues,
      abilities
    );
    addSkillsByName(JSON.parse(subclass.skillsByLevel)[1], formValues, skills);
    switch (subclass.name) {
      case "Knowledge Domain":
        if (knowledgeDomainDataNotNull(formData)) {
          addUniqueProficiencies(
            [
              formData.knowledgeDomainSkillProficiencyOne!,
              formData.knowledgeDomainSkillProficiencyTwo!,
            ],
            formValues
          );
          addLanguagesById(
            [
              formData.knowledgeDomainLanguageIdOne!,
              formData.knowledgeDomainLanguageIdTwo!,
            ],
            formValues,
            languages
          );
        }
        return { formValues };
      case "Nature Domain":
        if (natureDomainDataNotNull(formData)) {
          addUniqueProficiencies(
            [formData.natureDomainSkillProficiency!],
            formValues
          );
          addSpellById(formData.natureDomainSpellIdOne!, formValues, spells);
        }
        return { formValues };
      case "Draconic Bloodline":
        if (draconicBloodlineDataNotNull(formData)) {
          addUniqueAdvantages(
            [formData.draconicBloodlineAdvantage!],
            formValues
          );
        }
        return { formValues };
      default:
        return { formValues };
    }
  };

  const getRaceSpecificValues = (
    race: Race,
    formData: NewCharacter,
    formValues: NewCharacter
  ) => {
    applyAbilityScoreIncreases(race.abilityScoreIncreases, formValues);
    applyStatIncreases(race.statIncreases, formValues);
    formValues.size = race.size;
    formValues.speed = race.speed;
    if (race.languages) addUniqueLanguages(race.languages, formValues);
    addUniqueProficiencies(race.proficiencies, formValues);
    addUniqueResistances(race.resistances, formValues);
    addUniqueAdvantages(race.advantages, formValues);
    if (race.senses) addUniqueSenses(race.senses, formValues);
    addUniqueMagicSavingThrows(race.magicSavingThrows, formValues);
    if (race.spells) addUniqueSpells(race.spells, formValues);
    if (race.skills) addUniqueSkills(race.skills, formValues);

    switch (race.name) {
      case "Dwarf":
        formValues.proficiencies.push(formData.dwarfToolProficiency || "");
        return { formValues };
      case "Dragonborn":
        if (formData.dragonbornBreathWeaponId) {
          addSpellById(formData.dragonbornBreathWeaponId, formValues, spells);
        }
        formValues.resistances.push(formData.dragonbornResistanceType || "");
        return { formValues };
      case "Half-Elf":
        if (formData.halfElfBonusLanguageId) {
          addLanguageById(
            formData.halfElfBonusLanguageId,
            formValues,
            languages
          );
        }
        formValues.stats[formData.halfElfBonusAbilityScoreOne as string] += 1;
        formValues.stats[formData.halfElfBonusAbilityScoreTwo as string] += 1;

        addUniqueProficiencies(
          [
            formData.halfElfBonusSkillProficiencyOne!,
            formData.halfElfBonusSkillProficiencyTwo!,
          ],
          formValues
        );
        return { formValues };
      case "Human":
        if (formData.humanBonusLanguageId) {
          addLanguageById(formData.humanBonusLanguageId, formValues, languages);
        }
        return { formValues };
      default:
        return { formValues };
    }
  };

  const getSubraceSpecificValues = (
    subrace: Subrace,
    formData: NewCharacter,
    formValues: NewCharacter
  ) => {
    applyAbilityScoreIncreases(subrace.abilityScoreIncreases, formValues);
    if (subrace.statIncreases)
      applyStatIncreases(subrace.statIncreases, formValues);
    formValues.size = subrace.size;
    formValues.speed = subrace.speed;
    if (subrace.languages) addUniqueLanguages(subrace.languages, formValues);
    addUniqueProficiencies(subrace.proficiencies, formValues);
    addUniqueResistances(subrace.resistances, formValues);
    addUniqueAdvantages(subrace.advantages, formValues);
    addUniqueDisadvantages(subrace.disadvantages, formValues);
    if (subrace.senses) addUniqueSenses(subrace.senses, formValues);
    if (subrace.spells) addUniqueSpells(subrace.spells, formValues);
    if (subrace.skills) addUniqueSkills(subrace.skills, formValues);

    switch (subrace.name) {
      case "High Elf":
        if (formData.highElfBonusLanguageId && formData.highElfBonusCantripId) {
          addLanguageById(
            formData.highElfBonusLanguageId,
            formValues,
            languages
          );
          addSpellById(formData.highElfBonusCantripId, formValues, spells);
        }
        return { formValues };
      default:
        return { formValues };
    }
  };

  const getBackgroundSpecificValues = (
    formData: NewCharacter,
    formValues: NewCharacter
  ) => {
    if (characterDataNotNull(formData)) {
      formValues.background = formData.characterBackground!;
      formValues.alignment = formData.characterAlignment!;
      formValues.ideals.push(formData.characterIdealOne!);
      formValues.ideals.push(formData.characterIdealTwo!);
      formValues.bonds.push(formData.characterBondOne!);
      formValues.bonds.push(formData.characterBondTwo!);
      formValues.flaws.push(formData.characterFlawOne!);
      formValues.flaws.push(formData.characterFlawTwo!);
      formValues.fears.push(formData.characterFearOne!);
      formValues.fears.push(formData.characterFearTwo!);
      formValues.backstory = formData.characterBackstory!;
      formValues.appearance = formData.characterAppearance!;
    }
  };

  return {
    getFormDataByClassAndRace,
  };
};

export default useFormFilter;
