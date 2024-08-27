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

const classFormComponents: Record<ClassName, React.FC<object>> = {
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

const subclassFormComponents: Record<SubclassName, React.FC<object>> = {
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
  const [charClass, setCharClass] = useState<Class | null>(null);
  const [subclass, setSubclass] = useState<Subclass | null>(null);
  const { getClassById } = useClasses();
  const { getSubclassById } = useSubclasses();

  useEffect(() => {
    const fetchClassWithSubclass = async () => {
      try {
        const classData = await getClassById({ id: values.classId });
        if (classData) setCharClass(classData);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }

      if (values.subclassId) {
        try {
          const subclassData = await getSubclassById({ id: values.subclassId });
          if (subclassData) setSubclass(subclassData);
        } catch (error) {
          console.error('Error fetching subclass data:', error);
        }
      }
    };

    fetchClassWithSubclass();
  }, [values.classId, values.subclassId, getClassById, getSubclassById]);

  const ClassFormComponent = charClass
    ? classFormComponents[charClass.name as ClassName]
    : null;
  const SubclassFormComponent =
    subclass && charClass?.subClassAvailableAtLevel === 1
      ? subclassFormComponents[subclass.name as SubclassName]
      : null;

  return (
    <div className="flex flex-col gap-y-8 items-center">
      {ClassFormComponent && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-2xl">
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">
            Class Details
          </h3>
          <ClassFormComponent />
        </div>
      )}
      {SubclassFormComponent && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-2xl ">
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">
            Subclass Details
          </h3>
          <SubclassFormComponent />
        </div>
      )}
    </div>
  );
};

export default StepFour;
