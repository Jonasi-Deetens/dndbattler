import { ErrorMessage, Field, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { NewCharacter, Spell } from '../../types/DBTypes';
import useClasses from '../../hooks/useClasses';
import useSpells from '../../hooks/useSpells';

const SpellSelectField = ({
  name,
  filter,
  onChange,
  noDivider = true,
  spellClass
}: {
  name: string;
  filter: (option: Spell) => boolean;
  onChange: (value: Spell) => void;
  noDivider?: boolean;
  spellClass?: string;
}) => {
  const { getAllSpellsFromClass } = useClasses();
  const { spells } = useSpells();
  const { values } = useFormikContext<NewCharacter>();
  const [classSpells, setClassSpells] = useState<Spell[]>([]);

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const spellsData = await getAllSpellsFromClass({
          className: spellClass || ''
        });
        setClassSpells(spellsData || []);
      } catch (error) {
        console.error(error);
      }
    };
    if (spellClass) fetchSpells();
  }, []);

  return (
    <>
      <Field
        as="select"
        name={name}
        aria-label={name}
        className="p-1 text-gray-500 mt-5 w-full"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const selectedSpell = spells.find(
            spell => spell.id === parseInt(e.target.value)
          );
          if (selectedSpell) {
            onChange(selectedSpell);
          }
        }}
        value={values[name]}
      >
        {spellClass
          ? classSpells &&
            classSpells.filter(filter).map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))
          : spells &&
            spells.filter(filter).map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
      </Field>
      <ErrorMessage name={name} component="div" className="error" />
      {!noDivider && (
        <hr className="border-dotted border-t-8 w-1/4 m-auto my-5" />
      )}
    </>
  );
};

export default SpellSelectField;
