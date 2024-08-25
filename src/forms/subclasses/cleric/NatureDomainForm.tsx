import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { NewCharacter, SkillCheck, Spell } from '../../../types/DBTypes';
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

      <div className="w-1/2 m-auto">
        <p className="border-b p-2 w-fit m-auto">
          Select 1 extra skill proficiency:
        </p>
        <SkillCheckSelectField
          name="natureDomainSkillProficiency"
          filter={(option: SkillCheck) =>
            natureDomainSkillChoices.includes(option)
          }
          onChange={(value: SkillCheck) =>
            setFieldValue('natureDomainSkillProficiency', value)
          }
        />
        <p className="border-b p-2 w-fit m-auto">
          Select 1 extra druid cantrip:
        </p>
        <SpellSelectField
          name="natureDomainSpellIdOne"
          spellClass="Druid"
          filter={(option: Spell) => option.spellLevel === 0}
          onChange={(value: Spell) =>
            setFieldValue('natureDomainSpellIdOne', value.id)
          }
          noDivider={true}
        />
      </div>
    </div>
  );
};

export default NatureDomainForm;
