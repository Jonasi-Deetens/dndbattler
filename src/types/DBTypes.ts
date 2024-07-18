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
  subclassId?: number;
  background: string;
  alignment: string;
  primaryGoal: string;
  exhaustionLevel: number;
  numberOfRages: number;
  rageDamage: number;
  kiPoints: number;
  sorceryPoints: number;
  sneakAttack: number;
  invocationsKnown: number;
  cantripsKnown: number;
  spellsKnown: number;
  secondaryGoals: string[];
  personalQuest?: string;
  primaryAbilityScoreModifier?: AbilityScore;
  primarySpellAbilityScoreModifier?: AbilityScore;
  relationships: Relationship[];
  proficiencyBonus: number;
  proficiencies: string[];
  spellSlots: number;
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
  stats: Record<string, number>;
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
  proficiencyBonusByLevel: Record<number, string>;
  numberOfRagesByLevel?: Record<number, number>;
  abilitiesByLevel: Record<number, string[]>;
  buffsByLevel: Record<number, string>;
  primaryAbilityScoreModifier?: AbilityScore;
  primarySpellAbilityScoreModifier?: AbilityScore;
  subClasses: Subclass[];
  rageDamageByLevel?: Record<string, number>;
  spells: Spell[];
  spellsByLevel: Record<number, string[]>;
  spellSlotsByLevel: Record<number, string>;
  skillsByLevel: Record<number, string[]>;
  subClassAvailableAtLevel: number;
  unusableItems: string[];
  fightingStyles: FightingStyle[];
  movementSpeedBonusByLevel: Record<number, string>;
  exhaustionLevel: number;
  kiPointsByLevel: Record<number, number>;
  sorceryPointsByLevel: Record<number, number>;
  sneakAttackByLevel?: Record<number, number>;
  invocationsKnownByLevel: Record<number, number>;
  cantripsKnownByLevel: Record<number, number>;
  spellsKnownByLevel: Record<number, number>;
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
  abilityScoreIncreases: Record<string, number>;
  statIncreases: Record<string, number>;
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
  abilityScoreIncreases: Record<string, number>;
  statIncreases?: Record<string, number>;
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
  ARCHERY = 'Archery',
  DEFENSE = 'Defense',
  DUELING = 'Dueling',
  GREAT_WEAPON_FIGHTING = 'Great Weapon Fighting',
  PROTECTION = 'Protection',
  TWO_WEAPON_FIGHTING = 'Two Weapon Fighting'
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

export enum Alignment {
  LAWFUL_GOOD = 'Lawful Good',
  NEUTRAL_GOOD = 'Neutral Good',
  CHAOTIC_GOOD = 'Chaotic Good',
  LAWFUL_NEUTRAL = 'Lawful Neutral',
  TRUE_NEUTRAL = 'True Neutral',
  CHAOTIC_NEUTRAL = 'Chaotic Neutral',
  LAWFUL_EVIL = 'Lawful Evil',
  NEUTRAL_EVIL = 'Neutral Evil',
  CHAOTIC_EVIL = 'Chaotic Evil'
}

export enum Ideal {
  RESPECT = 'Respect',
  FAIRNESS = 'Fairness',
  GREED = 'Greed',
  FREEDOM = 'Freedom',
  CHARITY = 'Charity',
  KNOWLEDGE = 'Knowledge'
}

export enum Bond {
  FAMILY = 'Family',
  HONOR = 'Honor',
  REVENGE = 'Revenge',
  FRIENDSHIP = 'Friendship',
  DUTY = 'Duty',
  REDEMPTION = 'Redemption'
}

export enum Flaw {
  ARROGANCE = 'Arrogance',
  GREED = 'Greed',
  IMPULSIVENESS = 'Impulsiveness',
  COWARDICE = 'Cowardice',
  PARANOIA = 'Paranoia',
  ADDICTION = 'Addiction'
}

export enum Fear {
  DARKNESS = 'Darkness',
  HEIGHTS = 'Heights',
  FAILURE = 'Failure',
  SOLITUDE = 'Solitude',
  WATER = 'Water',
  MAGIC = 'Magic',
  LOSING_PEOPLE = 'Losing people'
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
  barbarianBonusSkillProficiencyOne?: string;
  barbarianBonusSkillProficiencyTwo?: string;
  bardBonusSkillProficiencyOne?: string;
  bardBonusSkillProficiencyTwo?: string;
  bardBonusSkillProficiencyThree?: string;
  barbarianEquipmentOne?: string;
  barbarianEquipmentTwo?: string;
  bardEquipmentOne?: string;
  bardEquipmentTwo?: string;
  bardEquipmentThree?: string;
  bardBonusMusicalProficiencyOne?: string;
  bardBonusMusicalProficiencyTwo?: string;
  bardBonusMusicalProficiencyThree?: string;
  bardBonusCantripIdOne?: number;
  bardBonusCantripIdTwo?: number;
  bardBonusSpellIdOne?: number;
  bardBonusSpellIdTwo?: number;
  bardBonusSpellIdThree?: number;
  bardBonusSpellIdFour?: number;
  clericSkillProficiencyOne?: string;
  clericSkillProficiencyTwo?: string;
  clericCantripIdOne?: number;
  clericCantripIdTwo?: number;
  clericCantripIdThree?: number;
  clericEquipmentOne?: string;
  clericEquipmentTwo?: string;
  clericEquipmentThree?: string;
  clericEquipmentFour?: string;
  druidSkillProficiencyOne?: string;
  druidSkillProficiencyTwo?: string;
  druidEquipmentOne?: string;
  druidEquipmentTwo?: string;
  druidCantripIdOne?: number;
  druidCantripIdTwo?: number;
  druidSpellIdOne?: number;
  druidSpellIdTwo?: number;
  fighterBonusSkillProficiencyOne?: string;
  fighterBonusSkillProficiencyTwo?: string;
  fighterEquipmentOne?: string;
  fighterEquipmentTwo?: string;
  fighterEquipmentThree?: string;
  fighterEquipmentFour?: string;
  fighterEquipmentFive?: string;
  fighterFightingStyle?: string;
  monkSkillProficiencyOne?: string;
  monkSkillProficiencyTwo?: string;
  monkEquipmentOne?: string;
  monkEquipmentTwo?: string;
  monkProficiency?: string;
  paladinBonusSkillProficiencyOne?: string;
  paladinBonusSkillProficiencyTwo?: string;
  paladinEquipmentOne?: string;
  paladinEquipmentTwo?: string;
  paladinEquipmentThree?: string;
  paladinEquipmentFour?: string;
  rangerSkillProficiencyOne?: string;
  rangerSkillProficiencyTwo?: string;
  rangerSkillProficiencyThree?: string;
  rangerEquipmentOne?: string;
  rangerEquipmentTwo?: string;
  rangerEquipmentThree?: string;
  rangerBonusLanguageId?: number;
  rogueSkillProficiencyOne?: string;
  rogueSkillProficiencyTwo?: string;
  rogueSkillProficiencyThree?: string;
  rogueSkillProficiencyFour?: string;
  rogueSkillProficiencyFive?: string;
  rogueEquipmentOne?: string;
  rogueEquipmentTwo?: string;
  rogueEquipmentThree?: string;
  sorcererSkillProficiencyOne?: string;
  sorcererSkillProficiencyTwo?: string;
  sorcererEquipmentOne?: string;
  sorcererEquipmentTwo?: string;
  sorcererEquipmentThree?: string;
  sorcererCantripIdOne?: number;
  sorcererCantripIdTwo?: number;
  sorcererCantripIdThree?: number;
  sorcererCantripIdFour?: number;
  sorcererCantripIdFive?: number;
  sorcererSpellIdOne?: number;
  sorcererSpellIdTwo?: number;
  warlockSkillProficiencyOne?: string;
  warlockSkillProficiencyTwo?: string;
  warlockEquipmentOne?: string;
  warlockEquipmentTwo?: string;
  warlockEquipmentThree?: string;
  warlockCantripIdOne?: number;
  warlockCantripIdTwo?: number;
  warlockSpellIdOne?: number;
  warlockSpellIdTwo?: number;
  wizardSkillProficiencyOne?: string;
  wizardSkillProficiencyTwo?: string;
  wizardEquipmentOne?: string;
  wizardEquipmentTwo?: string;
  wizardEquipmentThree?: string;
  wizardCantripIdOne?: number;
  wizardCantripIdTwo?: number;
  wizardCantripIdThree?: number;
  wizardSpellIdOne?: number;
  wizardSpellIdTwo?: number;
  wizardSpellIdThree?: number;
  wizardSpellIdFour?: number;
  wizardSpellIdFive?: number;
  wizardSpellIdSix?: number;
  knowledgeDomainSkillProficiencyOne?: string;
  knowledgeDomainSkillProficiencyTwo?: string;
  knowledgeDomainLanguageIdOne?: number;
  knowledgeDomainLanguageIdTwo?: number;
  natureDomainSkillProficiency?: string;
  natureDomainSpellIdOne?: number;
  draconicBloodlineAdvantage?: string;
  characterBackground?: string;
  characterAlignment?: string;
  characterIdealOne?: string;
  characterIdealTwo?: string;
  characterBondOne?: string;
  characterBondTwo?: string;
  characterFlawOne?: string;
  characterFlawTwo?: string;
  characterFearOne?: string;
  characterFearTwo?: string;
  characterBackstory?: string;
  characterAppearance?: string;
  [key: string]: unknown;
}
