import { ErrorMessage, Field, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { NewCharacter, Race } from "../../types/DBTypes";
import useLanguages from "../../hooks/useLanguages";
import useRaces from "../../hooks/useRaces";
import { AbilityScore } from "../../types/DBTypes";
import { SkillCheck } from "../../types/DBTypes";

const abilityScores = Object.values(AbilityScore);
const skillChecks = Object.values(SkillCheck);

const HalfElfForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { getRaceByName } = useRaces();
  const [race, setRace] = useState<Race>();
  const { languages } = useLanguages();

  useEffect(() => {
    const fetchRace = async () => {
      try {
        const race = await getRaceByName({ name: "Half Elf" });
        if (race) setRace(race);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRace();

    if (!values.halfElfBonusAbilityScoreOne)
      setFieldValue("halfElfBonusAbilityScoreOne", abilityScores[0]);
    if (!values.halfElfBonusAbilityScoreTwo)
      setFieldValue("halfElfBonusAbilityScoreTwo", abilityScores[1]);
    if (!values.halfElfBonusSkillProficiencyOne)
      setFieldValue("halfElfBonusSkillProficiencyOne", skillChecks[0]);
    if (!values.halfElfBonusSkillProficiencyTwo)
      setFieldValue("halfElfBonusSkillProficiencyTwo", skillChecks[1]);
  }, []);

  useEffect(() => {
    if (languages && race && !values.halfElfBonusLanguageId)
      setFieldValue(
        "halfElfBonusLanguageId",
        languages.filter((language) =>
          race.languages.every((lang) => lang.name !== language.name)
        )[0].id
      );
  }, [languages, race, values, setFieldValue]);

  return (
    <div>
      <h2 className="border p-2">HALF ELF</h2>

      <p className="border-b p-2 w-fit m-auto">Select Ability Score +1.</p>
      <Field
        as="select"
        name="halfElfBonusAbilityScoreOne"
        aria-label="HalfElfBonusAbilityScoreOne"
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("halfElfBonusAbilityScoreOne", e.target.value);
        }}
        value={values.halfElfBonusAbilityScoreOne}
      >
        {abilityScores.map((score) => (
          <option key={score} value={score}>
            {score}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name="halfElfBonusAbilityScoreOne"
        component="div"
        className="error"
      />
      <hr className="border-dotted border-t-8 w-1/4 m-auto my-5" />
      <p className="border-b p-2 w-fit m-auto">Select Ability Score +1.</p>
      <Field
        as="select"
        name="halfElfBonusAbilityScoreTwo"
        aria-label="HalfElfBonusAbilityScoreTwo"
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("halfElfBonusAbilityScoreTwo", e.target.value);
        }}
        value={values.halfElfBonusAbilityScoreTwo}
      >
        {abilityScores.map((score) => (
          <option key={score} value={score}>
            {score}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name="halfElfBonusAbilityScoreTwo"
        component="div"
        className="error"
      />
      <hr className="border-dotted border-t-8 w-1/4 m-auto my-5" />
      <p className="border-b p-2 w-fit m-auto">Select skill proficiency.</p>
      <Field
        as="select"
        name="halfElfBonusSkillProficiencyOne"
        aria-label="HalfElfBonusSkillProficiencyOne"
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("halfElfBonusSkillProficiencyOne", e.target.value);
        }}
        value={values.halfElfBonusSkillProficiencyOne}
      >
        {skillChecks
          .filter((score) => score !== values.halfElfBonusSkillProficiencyTwo)
          .map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
      </Field>
      <ErrorMessage
        name="halfElfBonusSkillProficiencyOne"
        component="div"
        className="error"
      />
      <hr className="border-dotted border-t-8 w-1/4 m-auto my-5" />
      <p className="border-b p-2 w-fit m-auto">Select skill proficiency.</p>
      <Field
        as="select"
        name="halfElfBonusSkillProficiencyTwo"
        aria-label="HalfElfBonusSkillProficiencyTwo"
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("halfElfBonusSkillProficiencyTwo", e.target.value);
        }}
        value={values.halfElfBonusSkillProficiencyTwo}
      >
        {skillChecks
          .filter((score) => score !== values.halfElfBonusSkillProficiencyOne)
          .map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
      </Field>
      <ErrorMessage
        name="halfElfBonusSkillProficiencyTwo"
        component="div"
        className="error"
      />
      <hr className="border-dotted border-t-8 w-1/4 m-auto my-5" />
      <p className="border-b p-2 w-fit m-auto">Select 1 extra language.</p>
      <Field
        as="select"
        name="halfElfBonusLanguageId"
        aria-label="HalfElfBonusLanguage"
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("halfElfBonusLanguageId", e.target.value);
        }}
        value={values.halfElfBonusLanguageId}
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
        name="halfElfBonusLanguageId"
        component="div"
        className="error"
      />
    </div>
  );
};

export default HalfElfForm;
