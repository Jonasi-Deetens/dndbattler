import { ErrorMessage, Field, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { NewCharacter, Race, Spell } from "../../types/DBTypes";
import useClasses from "../../hooks/useClasses";
import useLanguages from "../../hooks/useLanguages";
import useRaces from "../../hooks/useRaces";

const HighElfForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { getAllSpellsFromClass } = useClasses();
  const { getRaceByName } = useRaces();
  const [spells, setSpells] = useState<Spell[]>();
  const [race, setRace] = useState<Race>();
  const { languages } = useLanguages();

  useEffect(() => {
    const fetchSpellsByClass = async () => {
      try {
        const spellsData = await getAllSpellsFromClass({ className: "Wizard" });
        if (spellsData) {
          setSpells(spellsData);
          if (!values.highElfBonusCantripId)
            setFieldValue(
              "highElfBonusCantripId",
              spellsData.filter((spell) => spell.spellLevel === 0)[0].id
            );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpellsByClass();

    const fetchRace = async () => {
      try {
        const race = await getRaceByName({ name: "Elf" });
        if (race) {
          setRace(race);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRace();
  }, []);

  useEffect(() => {
    if (languages && race && !values.highElfBonusLanguageId)
      setFieldValue(
        "highElfBonusLanguageId",
        languages.filter((language) =>
          race.languages.every((lang) => lang.name !== language.name)
        )[0].id
      );
  }, [languages, race, values, setFieldValue]);

  return (
    <div>
      <h2 className="border p-2">HIGH ELF</h2>

      <p className="border-b p-2 w-fit m-auto">
        Select 1 of the following wizard cantrips.
      </p>
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
      <hr className="border-dotted border-t-8 w-1/4 m-auto my-5" />
      <p className="border-b p-2 w-fit m-auto">Select 1 extra language.</p>
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
          race &&
          languages
            .filter((language) =>
              race.languages.every((lang) => lang.name !== language.name)
            )
            .map((option) => {
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
