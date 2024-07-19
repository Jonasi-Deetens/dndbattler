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
          alignment: "Neutral",
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
            ac: 12,
            hp: 8,
            str: 1,
            dex: 1,
            con: 1,
            int: 1,
            wis: 1,
            cha: 1,
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
        return {};
      }
    },
    [getClassById, getSubclassById, getRaceById, getSubraceById]
  );

  const getClassSpecificValues = (
    charClass: Class,
    formData: NewCharacter,
    formValues: NewCharacter
  ) => {
    formValues.proficiencyBonus = parseInt(
      charClass.proficiencyBonusByLevel[1]
    );
    formValues.spellSlots = charClass.spellSlotsByLevel[1];
    addItems(charClass.items, formValues);
    addUniqueSavingThrows(charClass.savingThrowProficiencies, formValues);
    addUniqueProficiencies(charClass.proficiencies, formValues);
    addUniqueSpellsByName(charClass.spellsByLevel[1], formValues, spells);
    addAbilitiesByName(charClass.abilitiesByLevel[1], formValues, abilities);
    addSkillsByName(charClass.skillsByLevel[1], formValues, skills);
    formValues.primaryAbilityScoreModifier =
      charClass.primarySpellAbilityScoreModifier;
    formValues.primarySpellAbilityScoreModifier =
      charClass.primarySpellAbilityScoreModifier;
    if (charClass.movementSpeedBonusByLevel[1])
      formValues.speed += parseInt(charClass.movementSpeedBonusByLevel[1]);
    formValues.exhaustionLevel = charClass.exhaustionLevel;
    formValues.cantripsKnown = charClass.cantripsKnownByLevel[1];
    formValues.spellsKnown = charClass.spellsKnownByLevel[1];

    switch (charClass.name) {
      case "Barbarian":
        if (charClass.numberOfRagesByLevel)
          formValues.numberOfRages = charClass.numberOfRagesByLevel[1];
        if (charClass.rageDamageByLevel)
          formValues.rageDamage = charClass.rageDamageByLevel[1];
        if (barbarianDataNotNull(formData)) {
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
          formValues.kiPoints = charClass.kiPointsByLevel[1];
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
          formValues.sneakAttack = charClass.sneakAttackByLevel[1];
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
          formValues.sorceryPoints = charClass.sorceryPointsByLevel[1];
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
          formValues.invocationsKnown = charClass.invocationsKnownByLevel[1];
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
      ? subclass.spellslotsBySpellLevelByLevel[1]
      : [];
    addUniqueSavingThrows(subclass.savingThrowProficiencies, formValues);
    addUniqueProficiencies(subclass.proficiencies, formValues);
    formValues.primarySpellAbilityScoreModifier =
      subclass.primarySpellAbilityScoreModifier;
    formValues.cantripsKnown = subclass.cantripsKnownByLevel
      ? subclass.cantripsKnownByLevel[1]
      : 0;
    formValues.spellsKnown = subclass.spellsKnownByLevel
      ? subclass.spellsKnownByLevel[1]
      : 0;
    addUniqueSpellsByName(subclass.spellsByLevel[1], formValues, spells);
    addAbilitiesByName(subclass.abilitiesByLevel[1], formValues, abilities);
    addSkillsByName(subclass.skillsByLevel[1], formValues, skills);
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
    addUniqueLanguages(race.languages, formValues);
    addUniqueProficiencies(race.proficiencies, formValues);
    addUniqueResistances(race.resistances, formValues);
    addUniqueAdvantages(race.advantages, formValues);
    addUniqueSenses(race.senses, formValues);
    addUniqueMagicSavingThrows(race.magicSavingThrows, formValues);
    addUniqueSpells(race.spells, formValues);
    addUniqueSkills(race.skills, formValues);

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
    addUniqueLanguages(subrace.languages, formValues);
    addUniqueProficiencies(subrace.proficiencies, formValues);
    addUniqueResistances(subrace.resistances, formValues);
    addUniqueAdvantages(subrace.advantages, formValues);
    addUniqueDisadvantages(subrace.disadvantages, formValues);
    addUniqueSenses(subrace.senses, formValues);
    addUniqueSpells(subrace.spells, formValues);
    addUniqueSkills(subrace.skills, formValues);

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
      formValues.characterAppearance = formData.characterAppearance!;
    }
  };

  return {
    getFormDataByClassAndRace,
  };
};

export default useFormFilter;
