import {
  Ability,
  AbilityScore,
  CharacterStats,
  Item,
  Language,
  NewCharacter,
  Sense,
  Skill,
  Spell,
} from "../../types/DBTypes";

interface Stats {
  [key: string]: number;
}

export const applyAbilityScoreIncreases = (
  abilityScoreIncreases: Stats,
  formValues: NewCharacter
) => {
  for (const key in abilityScoreIncreases) {
    if (abilityScoreIncreases[key]) {
      formValues.stats[key as keyof CharacterStats] =
        (formValues.stats[key as keyof CharacterStats] || 0) +
        (abilityScoreIncreases[key] || 0);
    }
  }
};

export const applyStatIncreases = (
  statIncreases: Stats,
  formValues: NewCharacter
) => {
  for (const key in statIncreases) {
    if (statIncreases[key as keyof CharacterStats]) {
      formValues.stats[key as keyof CharacterStats] =
        (formValues.stats[key as keyof CharacterStats] || 0) +
        (statIncreases[key] || 0);
    }
  }
};

export const addUniqueLanguages = (
  list: Language[],
  formValues: NewCharacter
) => {
  list.forEach((language) => {
    const isLanguageInForm = formValues.languages.some(
      (formLanguage) => formLanguage.id === language.id
    );

    if (!isLanguageInForm) {
      formValues.languages.push(language);
    }
  });
};

export const addUniqueSenses = (list: Sense[], formValues: NewCharacter) => {
  list.forEach((sense) => {
    const isSenseInForm = formValues.senses.some(
      (formSense) => formSense.id === sense.id
    );

    if (!isSenseInForm) {
      formValues.senses.push(sense);
    }
  });
};

export const addUniqueMagicSavingThrows = (
  list: AbilityScore[],
  formValues: NewCharacter
) => {
  list.forEach((savingThrow) => {
    const isSavingThrowInForm = formValues.magicSavingThrows.some(
      (formSavingThrow) => formSavingThrow === savingThrow
    );

    if (!isSavingThrowInForm) {
      formValues.magicSavingThrows.push(savingThrow);
    }
  });
};

export const addUniqueSpells = (list: Spell[], formValues: NewCharacter) => {
  list.forEach((spell) => {
    const isSpellInForm = formValues.spells.some(
      (formSpell) => formSpell.id === spell.id
    );

    if (!isSpellInForm) {
      formValues.spells.push(spell);
    }
  });
};

export const addUniqueSkills = (list: Skill[], formValues: NewCharacter) => {
  list.forEach((skill) => {
    const isSkillInForm = formValues.skills.some(
      (formSkill) => formSkill.id === skill.id
    );

    if (!isSkillInForm) {
      formValues.skills.push(skill);
    }
  });
};

export const addUniqueAbilities = (
  list: Ability[],
  formValues: NewCharacter
) => {
  list.forEach((ability) => {
    const isAbilityInForm = formValues.abilities.some(
      (formAbility) => formAbility.id === ability.id
    );

    if (!isAbilityInForm) {
      formValues.abilities.push(ability);
    }
  });
};

export const addUniqueProficiencies = (
  proficiencies: string[],
  formValues: NewCharacter
) => {
  proficiencies.forEach((proficiency) => {
    if (!formValues.proficiencies.includes(proficiency)) {
      formValues.proficiencies.push(proficiency);
    }
  });
};

export const addUniqueSavingThrows = (
  savingThrows: AbilityScore[],
  formValues: NewCharacter
) => {
  savingThrows.forEach((proficiency) => {
    if (!formValues.savingThrows.includes(proficiency)) {
      formValues.savingThrows.push(proficiency);
    }
  });
};

export const addUniqueResistances = (
  proficiencies: string[],
  formValues: NewCharacter
) => {
  proficiencies.forEach((proficiency) => {
    if (!formValues.proficiencies.includes(proficiency)) {
      formValues.proficiencies.push(proficiency);
    }
  });
};

export const addUniqueAdvantages = (
  advantages: string[],
  formValues: NewCharacter
) => {
  advantages.forEach((advantage) => {
    if (!formValues.advantages.includes(advantage)) {
      formValues.advantages.push(advantage);
    }
  });
};

export const addUniqueDisadvantages = (
  disadvantages: string[],
  formValues: NewCharacter
) => {
  disadvantages.forEach((disadvantages) => {
    if (!formValues.advantages.includes(disadvantages)) {
      formValues.advantages.push(disadvantages);
    }
  });
};

export const addItems = (items: Item[], formValues: NewCharacter) => {
  items.forEach((item) => {
    formValues.items.push(item);
  });
};

export const addItemByName = (
  name: string,
  formValues: NewCharacter,
  items: Item[]
) => {
  if (items) {
    const item = items?.find((item) => item.name === name);
    if (item) addItems([item], formValues);
  }
};

export const addItemsByName = (
  names: string[],
  formValues: NewCharacter,
  items: Item[]
) => {
  names.forEach((name) => {
    addItemByName(name, formValues, items);
  });
};

export const addLanguageById = (
  id: number,
  formValues: NewCharacter,
  languages: Language[]
) => {
  if (languages) {
    const language = languages?.find((language) => language.id === id);
    if (language) addUniqueLanguages([language], formValues);
  }
};

export const addLanguagesById = (
  ids: number[],
  formValues: NewCharacter,
  languages: Language[]
) => {
  ids.forEach((id) => {
    addLanguageById(id, formValues, languages);
  });
};

export const addSpellById = (
  id: number,
  formValues: NewCharacter,
  spells: Spell[]
) => {
  if (spells) {
    const spell = spells?.find((spell) => spell.id === id);
    if (spell) addUniqueSpells([spell], formValues);
  }
};

export const addSpellsById = (
  ids: number[],
  formValues: NewCharacter,
  spells: Spell[]
) => {
  ids.forEach((id) => {
    addSpellById(id, formValues, spells);
  });
};

export const addAbilityByName = (
  name: string,
  formValues: NewCharacter,
  abilities: Ability[]
) => {
  if (abilities) {
    const ability = abilities?.find((ability) => ability.name === name);
    if (ability) addUniqueAbilities([ability], formValues);
  }
};

export const addAbilitiesByName = (
  names: string[],
  formValues: NewCharacter,
  abilities: Ability[]
) => {
  console.log(names);
  names.forEach((name) => {
    console.log(name);
    addAbilityByName(name, formValues, abilities);
  });
};

export const addSkillByName = (
  name: string,
  formValues: NewCharacter,
  skills: Skill[]
) => {
  if (skills) {
    const skill = skills?.find((skill) => skill.name === name);
    if (skill) addUniqueSkills([skill], formValues);
  }
};

export const addSkillsByName = (
  names: string[],
  formValues: NewCharacter,
  skills: Skill[]
) => {
  console.log(names);
  names.forEach((name) => {
    addSkillByName(name, formValues, skills);
  });
};

export const addUniqueSpellByName = (
  name: string,
  formValues: NewCharacter,
  spells: Spell[]
) => {
  if (spells) {
    const spell = spells?.find((spell) => spell.name === name);
    if (spell) addUniqueSpells([spell], formValues);
  }
};

export const addUniqueSpellsByName = (
  names: string[],
  formValues: NewCharacter,
  spells: Spell[]
) => {
  if (names) {
    names.forEach((name) => {
      const isSpellInForm = formValues.spells.some(
        (spell) => spell.name === name
      );

      if (!isSpellInForm) {
        addUniqueSpellByName(name, formValues, spells);
      }
    });
  }
};
