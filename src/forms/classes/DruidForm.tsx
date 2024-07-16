import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { NewCharacter, Spell, Item } from '../../types/DBTypes';
import useClasses from '../../hooks/useClasses';
import SkillCheckSelectField from '../../components/inputs/SkillCheckSelectField';
import ItemSelectField from '../../components/inputs/ItemSelectField';
import SpellSelectField from '../../components/inputs/SpellSelectField';

const druidSkillChoices = [
  'Arcana',
  'Animal Handling',
  'Insight',
  'Medicine',
  'Nature',
  'Perception',
  'Religion',
  'Survival'
];

const DruidForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { getAllSpellsFromClass } = useClasses();

  const itemChoicesOne = ['Wooden Shield', 'Simple Weapon'];
  const itemChoicesTwo = ['Scimitar', 'Simple Weapon'];

  useEffect(() => {
    const fetchSpellsByClass = async () => {
      try {
        const spellsData = await getAllSpellsFromClass({ className: 'Druid' });
        if (spellsData) {
          const cantrips = spellsData.filter(spell => spell.spellLevel === 0);
          const levelOneSpells = spellsData.filter(
            spell => spell.spellLevel === 1
          );

          if (cantrips.length > 1) {
            if (!values.druidCantripIdOne)
              setFieldValue('druidCantripIdOne', cantrips[0].id);
            if (!values.druidCantripIdTwo)
              setFieldValue('druidCantripIdTwo', cantrips[1].id);
          }

          if (levelOneSpells.length > 1) {
            if (!values.druidSpellIdOne)
              setFieldValue('druidSpellIdOne', levelOneSpells[0].id);
            if (!values.druidSpellIdTwo)
              setFieldValue('druidSpellIdTwo', levelOneSpells[1].id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpellsByClass();

    if (!values.druidSkillProficiencyOne)
      setFieldValue('druidSkillProficiencyOne', druidSkillChoices[0]);
    if (!values.druidSkillProficiencyTwo)
      setFieldValue('druidSkillProficiencyTwo', druidSkillChoices[1]);
  }, []);

  return (
    <div>
      <h2 className="border p-2">DRUID</h2>

      <SkillCheckSelectField
        name="druidSkillProficiencyOne"
        filter={(option: string) =>
          option !== values.druidSkillProficiencyTwo &&
          druidSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: string) =>
          setFieldValue('druidSkillProficiencyOne', value)
        }
      />
      <SkillCheckSelectField
        name="druidSkillProficiencyTwo"
        filter={(option: string) =>
          option !== values.druidSkillProficiencyOne &&
          druidSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: string) =>
          setFieldValue('druidSkillProficiencyTwo', value)
        }
      />

      <ItemSelectField
        name="druidEquipmentOne"
        filter={(option: Item) =>
          itemChoicesOne.includes(option.name) ||
          itemChoicesOne.includes(option.type)
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue('druidEquipmentOne', value.name)
        }
      />
      <ItemSelectField
        name="druidEquipmentTwo"
        filter={(option: Item) =>
          itemChoicesTwo.includes(option.name) ||
          (itemChoicesTwo.includes(option.type) && option.rangeType === 'Melee')
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue('druidEquipmentTwo', value.name)
        }
      />

      <SpellSelectField
        name="druidCantripIdOne"
        spellClass="Druid"
        filter={(option: Spell) =>
          option.spellLevel === 0 && option.id !== values.druidCantripIdTwo
        }
        label="Select 1 of the following druid cantrips."
        onChange={(value: Spell) =>
          setFieldValue('druidCantripIdOne', value.id)
        }
      />
      <SpellSelectField
        name="druidCantripIdTwo"
        spellClass="Druid"
        filter={(option: Spell) =>
          option.spellLevel === 0 && option.id !== values.druidCantripIdOne
        }
        label="Select 1 of the following druid cantrips."
        onChange={(value: Spell) =>
          setFieldValue('druidCantripIdTwo', value.id)
        }
      />

      <SpellSelectField
        name="druidSpellIdOne"
        spellClass="Druid"
        filter={(option: Spell) =>
          option.spellLevel === 1 && option.id !== values.druidSpellIdTwo
        }
        label="Select 1 of the following druid spells."
        onChange={(value: Spell) => setFieldValue('druidSpellIdOne', value.id)}
      />
      <SpellSelectField
        name="druidSpellIdTwo"
        spellClass="Druid"
        filter={(option: Spell) =>
          option.spellLevel === 1 && option.id !== values.druidSpellIdOne
        }
        label="Select 1 of the following druid spells."
        onChange={(value: Spell) => setFieldValue('druidSpellIdTwo', value.id)}
        noDivider={true}
      />
    </div>
  );
};

export default DruidForm;
