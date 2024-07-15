import { ErrorMessage, Field, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { NewCharacter, Spell } from "../../types/DBTypes";
import useClasses from "../../hooks/useClasses";
import useLanguages from "../../hooks/useLanguages";

const HighElfForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { getAllSpellsFromClass } = useClasses();
  const [spells, setSpells] = useState<Spell[]>();
  const { languages } = useLanguages();

  useEffect(() => {
    const fetchSpellsByClass = async () => {
      try {
        const spellsData = await getAllSpellsFromClass({ className: "Wizard" });
        if (spellsData) setSpells(spellsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpellsByClass();
  }, []);

  return (
    <div>
      <h2 className="border p-2">HIGH ELF</h2>

      <p className="border-b p-2">Select 1 of the following wizard cantrips.</p>
      <Field
        as="select"
        name="highElfBonusCantripId"
        aria-label="HighElfBonusCantrip"
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("highElfBonusCantripId", e.target.value);
        }}
        value={values.highElfBonusCantripId}
      >
        {spells &&
          spells
            .filter((spell) => spell.spellLevel === 0)
            .map((option) => {
              return (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              );
            })}
      </Field>
      <ErrorMessage
        name="highElfBonusCantripId"
        component="div"
        className="error"
      />

      <Field
        as="select"
        name="highElfBonusLanguageId"
        aria-label="HighElfBonusLanguage"
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("highElfBonusLanguageId", e.target.value);
        }}
        value={values.highElfBonusLanguageId}
      >
        {languages &&
          languages.map((option) => {
            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          })}
      </Field>
      <ErrorMessage
        name="highElfBonusLanguageId"
        component="div"
        className="error"
      />
    </div>
  );
};

export default HighElfForm;
