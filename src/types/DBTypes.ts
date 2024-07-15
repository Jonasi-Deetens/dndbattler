export type User = {
  id: string;
  email: string;
  username?: string;
  createdAt?: Date;
  updatedAt?: Date;
  characters?: Character[];
};

export type Campaign = {
  id: string;
  name: string;
  npcs: Npc[];
};

export type Character = {
  id: number;
  name: string;
  age: number;
  size: string;
  speed: number;
  raceId: number;
  classId: number;
  subraceId?: number;
  background: string;
  alignment: string;
  primaryGoal: string;
  secondaryGoals: string[];
  personalQuest?: string;
  relationships: Relationship[];
  backstory: string;
  currentLocation: string;
  skills: Skill[];
  languages: Language[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
  fears: string[];
  savingThrows: string[];
  magicSavingThrows: string[];
  advantages: string[];
  disadvantages: string[];
  resistances: string[];
  immunities: string[];
  obstacles: Obstacle[];
  internalConflicts: string[];
  vices: string[];
  appearance: string;
  personalityTraits: string[];
  items: Item[];
  spells: Spell[];
  level: number;
  experience: number;
  health: number;
  stats: Record<string, unknown>;
  senses: Sense[];
  userId: string;
  user: User;
  race: Race;
  class: Class;
  subrace?: Subrace | null;
  abilities: Ability[];
  memberships: Membership[];
};

export type Npc = {
  id: number;
  name: string;
  age: number;
  size: string;
  speed: number;
  raceId: number;
  classId: number;
  subraceId?: number;
  background: string;
  alignment: string;
  primaryGoal: string;
  secondaryGoals: string[];
  personalQuest?: string;
  relationships: Relationship[];
  organizations: Organization[];
  backstory: string;
  currentLocation: string;
  languages: Language[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
  fears: string[];
  savingThrows: string[];
  advantages: string[];
  disadvantages: string[];
  resistances: string[];
  immunities: string[];
  obstacles: Obstacle[];
  internalConflicts: string[];
  vices: string[];
  appearance: string;
  personalityTraits: string[];
  items: Item[];
  spells: Spell[];
  skills: Skill[];
  level: number;
  experienceReward: number;
  health: number;
  stats: Record<string, unknown>;
  senses: Sense[];
  race: Race;
  class: Class;
  subrace?: Subrace;
  campaignId: string;
  campaign: Campaign;
  abilities: Ability[];
  memberships: Membership[];
};

export type Monster = {
  id: number;
  name: string;
  type: string;
  description: string;
  health: number;
  armorClass: number;
  challengeRating: number;
  experienceReward: number;
  actions: string[];
  stats: Record<string, unknown>;
  vulnerabilities: string[];
  resistances: string[];
  immunities: string[];
  senses: Sense[];
  languages: Language[];
  items: Item[];
  spells: Spell[];
  skills: Skill[];
  abilities: Ability[];
  memberships: Membership[];
};

export type Class = {
  id: number;
  name: string;
  description: string;
  hitDice: Dice;
  proficiencies: string[];
  savingThrowProficiencies: AbilityScore[];
  items: Item[];
  proficiencyBonusByLevel: Record<string, unknown>;
  numberOfRagesByLevel?: Record<string, unknown>;
  abilitiesByLevel: Record<string, unknown>;
  buffsByLevel: Record<string, unknown>;
  primaryAbilityScoreModifier?: AbilityScore;
  primarySpellAbilityScoreModifier?: AbilityScore;
  subClasses: Subclass[];
  rageDamageByLevel?: Record<string, unknown>;
  spells: Spell[];
  spellsByLevel: Record<string, unknown>;
  spellSlotsByLevel: Record<string, unknown>;
  skillsByLevel: Record<string, unknown>;
  subClassAvailableAtLevel: number;
  unusableItems: string[];
  fightingStyles: FightingStyle[];
  movementSpeedBonusByLevel: Record<string, unknown>;
  exhaustionLevel: number;
  kiPointsByLevel: Record<string, unknown>;
  sorceryPointsByLevel: Record<string, unknown>;
  sneakAttackByLevel?: Record<string, unknown>;
  invocationsKnownByLevel: Record<string, unknown>;
  cantripsKnownByLevel: Record<string, unknown>;
  spellsKnownByLevel: Record<string, unknown>;
  characters: Character[];
  npcs: Npc[];
};

export type Subclass = {
  id: number;
  name: string;
  description: string;
  proficiencies: string[];
  primarySpellAbilityScoreModifier?: AbilityScore;
  savingThrowProficiencies: AbilityScore[];
  spells: Spell[];
  spellsByLevel: Record<string, unknown>;
  skillsByLevel: Record<string, unknown>;
  abilitiesByLevel: Record<string, unknown>;
  spellslotsBySpellLevelByLevel?: Record<string, unknown>;
  cantripsKnownByLevel?: Record<string, unknown>;
  spellsKnownByLevel?: Record<string, unknown>;
  parentClassId: number;
  parentClass: Class;
};

export type Ability = {
  id: number;
  name: string;
  description: string;
  damage?: string;
  buffs?: string;
  duration?: string;
  range?: string;
  actionType?: string;
  characters: Character[];
  npcs: Npc[];
  monsters: Monster[];
};

export type Language = {
  id: number;
  name: string;
  characters: Character[];
  npcs: Npc[];
  monsters: Monster[];
  races: Race[];
  subraces: Subrace[];
};

export type Skill = {
  id: number;
  name: string;
  description: string;
  characters: Character[];
  npcs: Npc[];
  monsters: Monster[];
  races: Race[];
  subraces: Subrace[];
};

export type Obstacle = {
  id: number;
  description: string;
  characterId?: number;
  character?: Character;
  npcId?: number;
  npc?: Npc;
};

export type Sense = {
  id: number;
  name: string;
  description: string;
  range: number;
  characters: Character[];
  npcs: Npc[];
  monsters: Monster[];
  races: Race[];
  subraces: Subrace[];
};

export type Item = {
  id: number;
  name: string;
  type: string;
  rangeType?: string;
  weight: number;
  cost: string;
  attributes: Record<string, unknown>;
  characters: Character[];
  npcs: Npc[];
  monsters: Monster[];
  classes: Class[];
};

export type Race = {
  id: number;
  name: string;
  abilityScoreIncreases: Record<string, unknown>;
  statIncreases: Record<string, unknown>;
  adultAge: number;
  maxAge: number;
  alignment: string;
  size: string;
  speed: number;
  languages: Language[];
  proficiencies: string[];
  resistances: string[];
  advantages: string[];
  raceDislikes: string[];
  senses: Sense[];
  subraces: Subrace[];
  magicSavingThrows: AbilityScore[];
  spells: Spell[];
  skills: Skill[];
  characters: Character[];
  npcs: Npc[];
};

export type Subrace = {
  id: number;
  name: string;
  parentRaceId: number;
  parentRace: Race;
  abilityScoreIncreases: Record<string, unknown>;
  statIncreases?: Record<string, unknown>;
  adultAge: number;
  maxAge: number;
  alignment: string;
  size: string;
  speed: number;
  languages: Language[];
  spells: Spell[];
  skills: Skill[];
  senses: Sense[];
  proficiencies: string[];
  resistances: string[];
  advantages: string[];
  disadvantages: string[];
  characters: Character[];
  npcs: Npc[];
};

export type Spell = {
  id: number;
  name: string;
  spellLevel: number;
  castingTime: number; // In minutes (action = 0, bonus action = -1)
  range: number; // In feet
  area: number; // In feet
  school: School;
  components: string[];
  savingThrows?: AbilityScore;
  description: string;
  damageType?: DamageType;
  effectType: EffectType;
  maxSpaceBetweenTargets?: number; // In feet, like acid splash, max 5 feet between 2 targeted monsters
  statChanges?: Record<string, unknown>;
  rolls?: Record<string, unknown>;
  rollsBySpellSlot?: Record<string, unknown>;
  duration: number; // In rounds or minutes
  spellEffects: SpellEffect[];
  concentration: boolean;
  ritual: boolean;
  savingThrowBonusDice?: Dice;
  attackBonusDice?: Dice;
  bonusDamage?: number; // Rolls that are like 1d4 +1 (where the +1 is this bonus damage)
  boostedBySpellModifier?: boolean; // For spells that have + spellcasting ability modifier
  rollByCharacterLevel?: boolean; // Indicates if the roll is based on character level
  rollBySpellSlot?: boolean; // Indicates if the roll is based on spell slot level
  race: Race[];
  class: Class[];
  subClasses: Subclass[];
  subrace: Subrace[];
  Character: Character[];
  Npc: Npc[];
  Monster: Monster[];
};

export type SpellEffect = {
  id: number;
  spellId: number;
  spell: Spell;
  targetType: string; // e.g., 'Creature', 'Self', 'Area'
  effectType: EffectType;
  value: Record<string, unknown>; // Stores the effect's value, e.g., {"duration": 600, "condition": "Charmed"}
};

export type Relationship = {
  id: number;
  description: string;
  characterId: number;
  character: Character;
  npcId?: number;
  npc?: Npc;
};

export type Organization = {
  id: number;
  name: string;
  description: string;
  leaderId?: number;
  leader?: Npc;
  Membership: Membership[];
};

export type Membership = {
  id: number;
  organizationId: number;
  characterId?: number;
  npcId?: number;
  monsterId?: number;
  organization: Organization;
  character?: Character;
  npc?: Npc;
  monster?: Monster;
};

export enum FightingStyle {
  ARCHERY = 'ARCHERY',
  DEFENSE = 'DEFENSE',
  DUELING = 'DUELING',
  GREAT_WEAPON_FIGHTING = 'GREAT_WEAPON_FIGHTING',
  PROTECTION = 'PROTECTION',
  TWO_WEAPON_FIGHTING = 'TWO_WEAPON_FIGHTING'
}

export enum SkillChecks {
  Acrobatics = 'Acrobatics',
  AnimalHandling = 'Animal Handling',
  Arcana = 'Arcana',
  Athletics = 'Athletics',
  Deception = 'Deception',
  History = 'History',
  Insight = 'Insight',
  Intimidation = 'Intimidation',
  Investigation = 'Investigation',
  Medicine = 'Medicine',
  Nature = 'Nature',
  Perception = 'Perception',
  Performance = 'Performance',
  Persuasion = 'Persuasion',
  Religion = 'Religion',
  SleightOfHand = 'Sleight of Hand',
  Stealth = 'Stealth',
  Survival = 'Survival'
}

export enum School {
  ABJURATION = 'ABJURATION',
  CONJURATION = 'CONJURATION',
  DIVINATION = 'DIVINATION',
  ENCHANTMENT = 'ENCHANTMENT',
  EVOCATION = 'EVOCATION',
  ILLUSION = 'ILLUSION',
  NECROMANCY = 'NECROMANCY',
  TRANSMUTATION = 'TRANSMUTATION',
  TRANSFIGURATION = 'TRANSFIGURATION'
}

export enum Dice {
  D4 = 'D4',
  D6 = 'D6',
  D8 = 'D8',
  D10 = 'D10',
  D12 = 'D12',
  D20 = 'D20',
  D100 = 'D100'
}

export enum AbilityScore {
  STR = 'STR',
  DEX = 'DEX',
  CON = 'CON',
  INT = 'INT',
  WIS = 'WIS',
  CHA = 'CHA'
}

export enum EffectType {
  BUFF = 'BUFF',
  DEBUFF = 'DEBUFF',
  HEALING = 'HEALING',
  DAMAGE = 'DAMAGE',
  CONTROL = 'CONTROL',
  SUMMONING = 'SUMMONING',
  UTILITY = 'UTILITY',
  PROTECTION = 'PROTECTION',
  MOVEMENT = 'MOVEMENT',
  DETECTION = 'DETECTION',
  TRANSFORMATION = 'TRANSFORMATION',
  TRANSPORTATION = 'TRANSPORTATION',
  RESTORATION = 'RESTORATION',
  INSTANT_DEATH = 'INSTANT_DEATH',
  COMMUNICATION = 'COMMUNICATION',
  ILLUSION = 'ILLUSION'
}

export enum DamageType {
  ACID = 'ACID',
  BLUDGEONING = 'BLUDGEONING',
  COLD = 'COLD',
  FIRE = 'FIRE',
  FORCE = 'FORCE',
  LIGHTNING = 'LIGHTNING',
  NECROTIC = 'NECROTIC',
  PIERCING = 'PIERCING',
  POISON = 'POISON',
  PSYCHIC = 'PSYCHIC',
  RADIANT = 'RADIANT',
  SLASHING = 'SLASHING',
  THUNDER = 'THUNDER',
  VARIES = 'VARIES'
}

export interface NewCharacter
  extends Omit<Character, 'id' | 'race' | 'class' | 'user'> {
  dwarfToolProficiency?: string;
  highElfBonusCantripId?: number;
  highElfBonusLanguageId?: number;
  humanBonusLanguageId?: number;
  dragonbornBreathWeaponId?: number;
  dragonbornResistanceType?: string;
  halfElfBonusLanguageId?: number;
  halfElfBonusAbilityScoreOne?: string;
  halfElfBonusAbilityScoreTwo?: string;
  halfElfBonusSkillProficiencyOne?: string;
  halfElfBonusSkillProficiencyTwo?: string;
}
