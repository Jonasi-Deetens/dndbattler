import { useCallback } from 'react';
import useClasses from './useClasses';
import useRaces from './useRaces';
import useSubclasses from './useSubclasses';
import useSubraces from './useSubraces';
import {
  Ability,
  AbilityScore,
  Class,
  Item,
  Language,
  NewCharacter,
  Race,
  Sense,
  Skill,
  Spell,
  Subclass,
  Subrace
} from '../types/DBTypes';
import useSpells from './useSpells';
import useLanguages from './useLanguages';
import useAbilities from './useAbilities';
import useSkills from './useSkills';

interface Stats {
  [key: string]: number;
}

const useFormFilter = () => {
  const { getClassById } = useClasses();
  const { getSubclassById } = useSubclasses();
  const { getRaceById } = useRaces();
  const { getSubraceById } = useSubraces();
  const { spells } = useSpells();
  const { languages } = useLanguages();
  const { abilities } = useAbilities();
  const { skills } = useSkills();

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
          spellSlots: 0,
          immunities: [],
          obstacles: [],
          internalConflicts: [],
          vices: [],
          skills: [],
          abilities: [],
          memberships: [],
          personalityTraits: [],
          appearance: '',
          items: [],
          spells: [],
          senses: [],
          age: 0,
          background: '',
          speed: 30,
          alignment: 'Neutral',
          primaryGoal: '',
          secondaryGoals: [],
          relationships: [],
          backstory: '',
          size: 'Medium',
          level: 1,
          experience: 0,
          health: 8,
          proficiencyBonus: 0,
          languages: [{ id: 1, name: 'common' } as Language],
          stats: {
            ac: 12,
            hp: 8,
            str: 1,
            dex: 1,
            con: 1,
            int: 1,
            wis: 1,
            cha: 1
          },
          raceId: formData.raceId,
          userId: formData.userId,
          classId: formData.classId,
          subclassId: formData.subclassId,
          proficiencies: []
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
    formValues.spellSlots = parseInt(charClass.spellSlotsByLevel[1]);
    addItems(charClass.items, formValues);
    addUniqueSavingThrows(charClass.savingThrowProficiencies, formValues);
    addUniqueProficiencies(charClass.proficiencies, formValues);
    addUniqueSpellsByName(charClass.spellsByLevel[1], formValues);
    addAbilitiesByName(charClass.abilitiesByLevel[1], formValues);
    addSkillsByName(charClass.skillsByLevel[1], formValues);
    formValues.primaryAbilityScoreModifier =
      charClass.primarySpellAbilityScoreModifier;
    formValues.primarySpellAbilityScoreModifier =
      charClass.primarySpellAbilityScoreModifier;
    if (charClass.movementSpeedBonusByLevel[1])
      formValues.speed += parseInt(charClass.movementSpeedBonusByLevel[1]);
    formValues.exhaustionLevel = charClass.exhaustionLevel;
    formValues.cantripsKnown = charClass.cantripsKnownByLevel[1];
    formValues.spellsKnown = charClass.spellsKnownByLevel[1];

    switch (
      charClass.name //FORMDATA TO ADD NOW
    ) {
      case 'Barbarian':
        if (charClass.numberOfRagesByLevel)
          formValues.numberOfRages = charClass.numberOfRagesByLevel[1];
        if (charClass.rageDamageByLevel)
          formValues.rageDamage = charClass.rageDamageByLevel[1];
        return { formValues };
      case 'Monk':
        if (charClass.kiPointsByLevel)
          formValues.kiPoints = charClass.kiPointsByLevel[1];
        return { formValues };
      case 'Rogue':
        if (charClass.sneakAttackByLevel)
          formValues.sneakAttack = charClass.sneakAttackByLevel[1];
        return { formValues };
      case 'Sorcerer':
        if (charClass.sorceryPointsByLevel)
          formValues.sorceryPoints = charClass.sorceryPointsByLevel[1];
        return { formValues };
      case 'Warlock':
        if (charClass.invocationsKnownByLevel)
          formValues.invocationsKnown = charClass.invocationsKnownByLevel[1];
        return { formValues };
      case 'Wizard':
        //   wizardSkillProficiencyOne: formData.wizardSkillProficiencyOne,
        //   wizardSkillProficiencyTwo: formData.wizardSkillProficiencyTwo,
        //   wizardEquipmentOne: formData.wizardEquipmentOne,
        //   wizardEquipmentTwo: formData.wizardEquipmentTwo,
        //   wizardEquipmentThree: formData.wizardEquipmentThree,
        //   wizardCantripIdOne: formData.wizardCantripIdOne,
        //   wizardCantripIdTwo: formData.wizardCantripIdTwo,
        //   wizardCantripIdThree: formData.wizardCantripIdThree,
        //   wizardSpellIdOne: formData.wizardSpellIdOne,
        //   wizardSpellIdTwo: formData.wizardSpellIdTwo,
        //   wizardSpellIdThree: formData.wizardSpellIdThree,
        //   wizardSpellIdFour: formData.wizardSpellIdFour,
        //   wizardSpellIdFive: formData.wizardSpellIdFive,
        //   wizardSpellIdSix: formData.wizardSpellIdSix

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
    switch (subclass.name) {
      case 'College of Valor':
        formValues.proficiencies.push(formData.dwarfToolProficiency || '');
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
      case 'Dwarf':
        formValues.proficiencies.push(formData.dwarfToolProficiency || '');
        return { formValues };
      case 'Dragonborn':
        if (formData.dragonbornBreathWeaponId) {
          addSpellById(formData.dragonbornBreathWeaponId, formValues);
        }
        formValues.resistances.push(formData.dragonbornResistanceType || '');
        return { formValues };
      case 'Half-Elf':
        if (formData.halfElfBonusLanguageId) {
          addLanguageById(formData.halfElfBonusLanguageId, formValues);
        }
        formValues.stats[formData.halfElfBonusAbilityScoreOne as string] += 1;
        formValues.stats[formData.halfElfBonusAbilityScoreTwo as string] += 1;

        addUniqueProficiencies(
          [
            formData.halfElfBonusSkillProficiencyOne!,
            formData.halfElfBonusSkillProficiencyTwo!
          ],
          formValues
        );
        return { formValues };
      case 'Human':
        if (formData.humanBonusLanguageId) {
          addLanguageById(formData.humanBonusLanguageId, formValues);
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
      case 'High Elf':
        if (formData.highElfBonusLanguageId && formData.highElfBonusCantripId) {
          addLanguageById(formData.highElfBonusLanguageId, formValues);
          addSpellById(formData.highElfBonusCantripId, formValues);
        }
        return { formValues };
      default:
        return { formValues };
    }
  };

  const applyAbilityScoreIncreases = (
    abilityScoreIncreases: Stats,
    formValues: NewCharacter
  ) => {
    for (const key in abilityScoreIncreases) {
      if (abilityScoreIncreases[key]) {
        formValues.stats[key] =
          (formValues.stats[key] || 0) + (abilityScoreIncreases[key] || 0);
      }
    }
  };

  const applyStatIncreases = (
    statIncreases: Stats,
    formValues: NewCharacter
  ) => {
    for (const key in statIncreases) {
      if (statIncreases[key]) {
        formValues.stats[key] =
          (formValues.stats[key] || 0) + (statIncreases[key] || 0);
      }
    }
  };

  const addUniqueLanguages = (list: Language[], formValues: NewCharacter) => {
    list.forEach(language => {
      const isLanguageInForm = formValues.languages.some(
        formLanguage => formLanguage.id === language.id
      );

      if (!isLanguageInForm) {
        formValues.languages.push(language);
      }
    });
  };

  const addUniqueSenses = (list: Sense[], formValues: NewCharacter) => {
    list.forEach(sense => {
      const isSenseInForm = formValues.senses.some(
        formSense => formSense.id === sense.id
      );

      if (!isSenseInForm) {
        formValues.senses.push(sense);
      }
    });
  };

  const addUniqueMagicSavingThrows = (
    list: AbilityScore[],
    formValues: NewCharacter
  ) => {
    list.forEach(savingThrow => {
      const isSavingThrowInForm = formValues.magicSavingThrows.some(
        formSavingThrow => formSavingThrow === savingThrow
      );

      if (!isSavingThrowInForm) {
        formValues.magicSavingThrows.push(savingThrow);
      }
    });
  };

  const addUniqueSpells = (list: Spell[], formValues: NewCharacter) => {
    list.forEach(spell => {
      const isSpellInForm = formValues.spells.some(
        formSpell => formSpell.id === spell.id
      );

      if (!isSpellInForm) {
        formValues.spells.push(spell);
      }
    });
  };

  const addUniqueSkills = (list: Skill[], formValues: NewCharacter) => {
    list.forEach(skill => {
      const isSkillInForm = formValues.skills.some(
        formSkill => formSkill.id === skill.id
      );

      if (!isSkillInForm) {
        formValues.skills.push(skill);
      }
    });
  };

  const addUniqueAbilities = (list: Ability[], formValues: NewCharacter) => {
    list.forEach(ability => {
      const isAbilityInForm = formValues.abilities.some(
        formAbility => formAbility.id === ability.id
      );

      if (!isAbilityInForm) {
        formValues.abilities.push(ability);
      }
    });
  };

  const addUniqueProficiencies = (
    proficiencies: string[],
    formValues: NewCharacter
  ) => {
    proficiencies.forEach(proficiency => {
      if (!formValues.proficiencies.includes(proficiency)) {
        formValues.proficiencies.push(proficiency);
      }
    });
  };

  const addUniqueSavingThrows = (
    savingThrows: AbilityScore[],
    formValues: NewCharacter
  ) => {
    savingThrows.forEach(proficiency => {
      if (!formValues.savingThrows.includes(proficiency)) {
        formValues.savingThrows.push(proficiency);
      }
    });
  };

  const addUniqueResistances = (
    proficiencies: string[],
    formValues: NewCharacter
  ) => {
    proficiencies.forEach(proficiency => {
      if (!formValues.proficiencies.includes(proficiency)) {
        formValues.proficiencies.push(proficiency);
      }
    });
  };

  const addUniqueAdvantages = (
    advantages: string[],
    formValues: NewCharacter
  ) => {
    advantages.forEach(advantage => {
      if (!formValues.advantages.includes(advantage)) {
        formValues.advantages.push(advantage);
      }
    });
  };

  const addUniqueDisadvantages = (
    disadvantages: string[],
    formValues: NewCharacter
  ) => {
    disadvantages.forEach(disadvantages => {
      if (!formValues.advantages.includes(disadvantages)) {
        formValues.advantages.push(disadvantages);
      }
    });
  };

  const addItems = (items: Item[], formValues: NewCharacter) => {
    items.forEach(item => {
      formValues.items.push(item);
    });
  };

  const addLanguageById = (id: number, formValues: NewCharacter) => {
    if (languages) {
      const language = languages?.find(language => language.id === id);
      if (language) addUniqueLanguages([language], formValues);
    }
  };

  const addSpellById = (id: number, formValues: NewCharacter) => {
    if (spells) {
      const spell = spells?.find(spell => spell.id === id);
      if (spell) addUniqueSpells([spell], formValues);
    }
  };

  const addAbilityByName = (name: string, formValues: NewCharacter) => {
    if (abilities) {
      const ability = abilities?.find(ability => ability.name === name);
      if (ability) addUniqueAbilities([ability], formValues);
    }
  };

  const addAbilitiesByName = (names: string[], formValues: NewCharacter) => {
    for (const name in names) {
      addAbilityByName(name, formValues);
    }
  };

  const addSkillByName = (name: string, formValues: NewCharacter) => {
    if (skills) {
      const skill = skills?.find(skill => skill.name === name);
      if (skill) addUniqueAbilities([skill], formValues);
    }
  };

  const addSkillsByName = (names: string[], formValues: NewCharacter) => {
    for (const name in names) {
      addSkillByName(name, formValues);
    }
  };

  const addUniqueSpellByName = (name: string, formValues: NewCharacter) => {
    if (skills) {
      const skill = skills?.find(skill => skill.name === name);
      if (skill) addUniqueAbilities([skill], formValues);
    }
  };

  const addUniqueSpellsByName = (names: string[], formValues: NewCharacter) => {
    for (const name in names) {
      const isSpellInForm = formValues.spells.some(
        spell => spell.name === name
      );

      if (!isSpellInForm) {
        addUniqueSpellByName(name, formValues);
      }
    }
  };

  return {
    getFormDataByClassAndRace
  };
};

export default useFormFilter;
