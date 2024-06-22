export type Character = {
    id: number;
    name: string;
    userId: number;
    classId: number;
    raceId: number;
    subraceId: number;
    background?: string;
    alignment?: string;
    primaryGoal?: string;
    secondaryGoals?: string[];
    personalQuest?: string | null;
    relationships?: Relationship[];
    organizations?: Organization[];
    backstory?: string;
    currentLocation?: string;
    primarySkills?: Skill[];
    languages: Language[];
    ideals?: string[];
    bonds?: string[];
    flaws?: string[];
    fears?: string[];
    enemies?: Enemy[];
    obstacles?: Obstacle[];
    internalConflicts?: string[];
    vices?: string[];
    appearance?: string;
    personalityTraits?: string[];
    items?: Item[];
    spells?: Spell[];
    level: number;
    experience: number;
    health: number;
    stats: Stats;
    senses?: Sense[];
    subrace?: Subrace | null;
    OrganizationMembership?: OrganizationMembership[];
    CharacterAbility?: CharacterAbility[];
};

export interface NewCharacter extends Omit<Character, 'id'> {}

// Define other related types as needed:
export type Stats = {
    hp: number;
    ac: number;
    [key: string]: number | string;
};

export type Class = {
    id: number;
    name: string;
    hitDice: string;
    primaryAbility: string;
    savingThrows: string[];
    proficiencies: string[];
    spellcasting: boolean;
    spellSlots: JSON;
    // Other properties of Class
};

export type Language = {
    // Define properties of Relationship
};

export type Enemy = {
    // Define properties of Relationship
};

export type Skill = {
    // Define properties of Relationship
};

export type Item = {
    // Define properties of Relationship
};

export type Spell = {
    // Define properties of Relationship
};

export type Sense = {
    // Define properties of Relationship
};

export type Relationship = {
    // Define properties of Relationship
};

export type Organization = {
    // Define properties of Organization
};

export type Obstacle = {
    // Define properties of Obstacle
};

export type User = {
    id: string;
    // Other properties of User
};

export type Race = {
    id: number;
    name: string;
    abilityScoreIncreases: JSON;
    age: string;
    alignement: string;
    size: string;
    speed: number;
    // Other properties of Race
};

export type Subrace = {
    id: number;
    name: string;
    abilityScoreIncreases: JSON;
    speed: number;
    // Other properties of Subrace
};

export type OrganizationMembership = {
    // Define properties of OrganizationMembership
};

export type CharacterAbility = {
    // Define properties of CharacterAbility
};