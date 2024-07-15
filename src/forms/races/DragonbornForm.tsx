import { ErrorMessage, Field, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { NewCharacter, Spell } from '../../types/DBTypes';
import useSpells from '../../hooks/useSpells';

const DragonbornForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { getSpellsByList } = useSpells();
  const [spells, setSpells] = useState<Spell[]>();
  const spellList = [
    'Breath Weapon (Acid)',
    'Breath Weapon (Cold)',
    'Breath Weapon (Fire)',
    'Breath Weapon (Lightning)',
    'Breath Weapon (Poison)'
  ];

  useEffect(() => {
    const fetchSpellsByList = async () => {
      try {
        const spellsData = await getSpellsByList({
          spellList: spellList
        });
        if (spellsData) setSpells(spellsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpellsByList();
  }, []);

  const handleSpellChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue('dragonbornBreathWeaponId', e.target.value);

    if (spells) {
      const spell = spells?.find(
        spell => spell.id === parseInt(e.target.value)
      );
      setFieldValue('dragonbornResistanceType', spell?.damageType);
    }
  };

  return (
    <div>
      <h2 className="border p-2">DRAGONBORN</h2>

      <p className="border-b p-2 w-fit m-auto">
        Select 1 of the following breath weapons.
      </p>
      <Field
        as="select"
        name="dragonbornBreathWeaponId"
        aria-label="DragonbornBreathWeapon"
        className="p-1 text-gray-500 mt-5"
        onChange={handleSpellChange}
        value={values.dragonbornBreathWeaponId}
      >
        {spells &&
          spells
            .filter(spell => spell.spellLevel === 0)
            .map(option => {
              return (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              );
            })}
      </Field>
      <ErrorMessage
        name="dragonbornBreathWeaponId"
        component="div"
        className="error"
      />
    </div>
  );
};

export default DragonbornForm;
