import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import useClasses from '../../hooks/useClasses';
import useSubclasses from '../../hooks/useSubclasses';
import { Class, NewCharacter, Subclass } from '../../types/DBTypes';
import * as ClassForms from '../../forms/classes';
import * as SubclassForms from '../../forms/subclasses';

type ClassName =
  | 'Barbarian'
  | 'Bard'
  | 'Cleric'
  | 'Druid'
  | 'Fighter'
  | 'Monk'
  | 'Paladin'
  | 'Ranger'
  | 'Rogue'
  | 'Sorcerer'
  | 'Warlock'
  | 'Wizard';

type ClassFormComponents = {
  [key in ClassName as string]: React.FC<object>;
};
const classFormComponents: ClassFormComponents = {
  Barbarian: ClassForms.BarbarianForm,
  Bard: ClassForms.BardForm,
  Cleric: ClassForms.ClericForm,
  Druid: ClassForms.DruidForm,
  Fighter: ClassForms.FighterForm,
  Monk: ClassForms.MonkForm,
  Paladin: ClassForms.PaladinForm,
  Ranger: ClassForms.RangerForm,
  Rogue: ClassForms.RogueForm,
  Sorcerer: ClassForms.SorcererForm,
  Warlock: ClassForms.WarlockForm,
  Wizard: ClassForms.WizardForm
};

type SubclassName =
  | 'Path of the Berserker'
  | 'Path of the Totem Warrior'
  | 'College of Lore'
  | 'College of Valor'
  | 'Knowledge Domain'
  | 'Life Domain'
  | 'Light Domain'
  | 'Nature Domain'
  | 'Tempest Domain'
  | 'Trickery Domain'
  | 'War Domain'
  | 'Circle of the Land'
  | 'Circle of the Moon'
  | 'Champion'
  | 'Battle Master'
  | 'Eldritch Knight'
  | 'Way of the Open Hand'
  | 'Way of Shadow'
  | 'Oath of Devotion'
  | 'Oath of the Ancients'
  | 'Oath of Vengeance'
  | 'Hunter'
  | 'Beast Master'
  | 'Thief'
  | 'Assassin'
  | 'Arcane Trickster'
  | 'Draconic Bloodline'
  | 'Wild Magic'
  | 'Archfey'
  | 'Fiend'
  | 'Great Old One'
  | 'School of Abjuration'
  | 'School of Conjuration'
  | 'School of Divination'
  | 'School of Enchantment'
  | 'School of Evocation'
  | 'School of Illusion'
  | 'School of Necromancy'
  | 'School of Transmutation';

type SubclassFormComponents = {
  [key in SubclassName as string]: React.FC<object>;
};
const subclassFormComponents: SubclassFormComponents = {
  'Path of the Berserker': SubclassForms.PathOfTheBerserkerForm,
  'Path of the Totem Warrior': SubclassForms.PathOfTheTotemWarriorForm,
  'College of Lore': SubclassForms.CollegeOfLoreForm,
  'College of Valor': SubclassForms.CollegeOfValorForm,
  'Knowledge Domain': SubclassForms.KnowledgeDomainForm,
  'Life Domain': SubclassForms.LifeDomainForm,
  'Light Domain': SubclassForms.LightDomainForm,
  'Nature Domain': SubclassForms.NatureDomainForm,
  'Tempest Domain': SubclassForms.TempestDomainForm,
  'Trickery Domain': SubclassForms.TrickeryDomainForm,
  'War Domain': SubclassForms.WarDomainForm,
  'Circle of the Land': SubclassForms.CircleOfTheLandForm,
  'Circle of the Moon': SubclassForms.CircleOfTheMoonForm,
  Champion: SubclassForms.ChampionForm,
  'Battle Master': SubclassForms.BattleMasterForm,
  'Eldritch Knight': SubclassForms.EldritchKnightForm,
  'Way of the Open Hand': SubclassForms.WayOfTheOpenHandForm,
  'Way of Shadow': SubclassForms.WayOfShadowForm,
  'Oath of Devotion': SubclassForms.OathOfDevotionForm,
  'Oath of the Ancients': SubclassForms.OathOfTheAncientsForm,
  'Oath of Vengeance': SubclassForms.OathOfVengeanceForm,
  Hunter: SubclassForms.HunterForm,
  'Beast Master': SubclassForms.BeastMasterForm,
  Thief: SubclassForms.ThiefForm,
  Assassin: SubclassForms.AssassinForm,
  'Arcane Trickster': SubclassForms.ArcaneTricksterForm,
  'Draconic Bloodline': SubclassForms.DraconicBloodlineForm,
  'Wild Magic': SubclassForms.WildMagicForm,
  Archfey: SubclassForms.ArchfeyForm,
  Fiend: SubclassForms.FiendForm,
  'Great Old One': SubclassForms.GreatOldOneForm,
  'School of Abjuration': SubclassForms.SchoolOfAbjurationForm,
  'School of Conjuration': SubclassForms.SchoolOfConjurationForm,
  'School of Divination': SubclassForms.SchoolOfDivinationForm,
  'School of Enchantment': SubclassForms.SchoolOfEnchantmentForm,
  'School of Evocation': SubclassForms.SchoolOfEvocationForm,
  'School of Illusion': SubclassForms.SchoolOfIllusionForm,
  'School of Necromancy': SubclassForms.SchoolOfNecromancyForm,
  'School of Transmutation': SubclassForms.SchoolOfTransmutationForm
};

const StepFour: React.FC = () => {
  const { values } = useFormikContext<NewCharacter>();
  const [charClass, setCharClass] = useState<Class>();
  const [subclass, setSubclass] = useState<Subclass>();
  const { getClassById } = useClasses();
  const { getSubclassById } = useSubclasses();

  useEffect(() => {
    const fetchClassWithSubclass = async () => {
      try {
        const classData = await getClassById({ id: values.classId });
        if (classData) setCharClass(classData);
      } catch (error) {
        console.error(error);
      }

      if (values.subclassId) {
        try {
          const subclassData = await getSubclassById({ id: values.subclassId });
          if (subclassData) setSubclass(subclassData);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchClassWithSubclass();
  }, []);

  const ClassFormComponent = charClass
    ? classFormComponents[charClass.name]
    : null;
  const SubclassFormComponent =
    subclass && charClass?.subClassAvailableAtLevel === 1
      ? subclassFormComponents[subclass.name]
      : null;
  return (
    <div>
      {ClassFormComponent && <ClassFormComponent />}
      {charClass?.subClassAvailableAtLevel === 1 && (
        <hr className="border-dashed border-t-2 w-1/2 m-auto my-5" />
      )}
      {SubclassFormComponent && <SubclassFormComponent />}
    </div>
  );
};

export default StepFour;
