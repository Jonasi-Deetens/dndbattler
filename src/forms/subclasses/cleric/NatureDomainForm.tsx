import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { NewCharacter, SkillChecks, Spell } from '../../../types/DBTypes';
import SkillCheckSelectField from '../../../components/inputs/SkillCheckSelectField';
import SpellSelectField from '../../../components/inputs/SpellSelectField';
import useClasses from '../../../hooks/useClasses';

const natureDomainSkillChoices = ['Animal Handling', 'Nature', 'Survival'];

const NatureDomainForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { getAllSpellsFromClass } = useClasses();
  const [druidCantrips, setDruidCantrips] = useState<Spell[]>([]);

  useEffect(() => {
    const fetchDruidCantrips = async () => {
      try {
        const spellsData = await getAllSpellsFromClass({ className: 'Druid' });
        if (spellsData) {
          const cantrips = spellsData.filter(spell => spell.spellLevel === 0);
          setDruidCantrips(cantrips);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDruidCantrips();

    if (!values.natureDomainSkillProficiency)
      setFieldValue(
        'natureDomainSkillProficiency',
        natureDomainSkillChoices[0]
      );
    if (!values.natureDomainSpellIdOne)
      setFieldValue('natureDomainSpellIdOne', druidCantrips[0]?.id);
  }, []);

  return (
    <div>
      <h2 className="border p-2">Nature Domain</h2>

      <SkillCheckSelectField
        name="natureDomainSkillProficiency"
        filter={(option: SkillChecks) =>
          natureDomainSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillChecks) =>
          setFieldValue('natureDomainSkillProficiency', value)
        }
      />

      <SpellSelectField
        name="natureDomainSpellIdOne"
        spellClass="Druid"
        filter={(option: Spell) => option.spellLevel === 0}
        label="Select a druid cantrip."
        onChange={(value: Spell) =>
          setFieldValue('natureDomainSpellIdOne', value.id)
        }
        noDivider={true}
      />
    </div>
  );
};

export default NatureDomainForm;
