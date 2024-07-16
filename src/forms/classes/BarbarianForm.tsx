import React, { useEffect } from "react";
import { NewCharacter, SkillChecks } from "../../types/DBTypes";
import { ErrorMessage, Field, useFormikContext } from "formik";

const skillChecks = Object.values(SkillChecks);

const BarbarianForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const skillsToChooseFrom = [
    "Animal Handling",
    "Athletics",
    "Intimidation",
    "Nature",
    "Perception",
    "Survival",
  ];

  useEffect(() => {
    setFieldValue("barbarianBonusSkillProficiencyOne", skillChecks[1]);
    setFieldValue("barbarianBonusSkillProficiencyTwo", skillChecks[3]);
  }, []);

  return (
    <div>
      <h2 className="border p-2">Barbarian</h2>

      <p className="border-b p-2 w-fit m-auto">Select skill proficiency.</p>
      <Field
        as="select"
        name="barbarianBonusSkillProficiencyOne"
        aria-label="BarbarianBonusSkillProficiencyOne"
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("barbarianBonusSkillProficiencyOne", e.target.value);
        }}
        value={values.barbarianBonusSkillProficiencyOne}
      >
        {skillChecks
          .filter(
            (skill) =>
              skill !== values.barbarianBonusSkillProficiencyTwo &&
              skillsToChooseFrom.includes(skill)
          )
          .map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
      </Field>
      <ErrorMessage
        name="barbarianBonusSkillProficiencyOne"
        component="div"
        className="error"
      />
      <hr className="border-dotted border-t-8 w-1/4 m-auto my-5" />
      <p className="border-b p-2 w-fit m-auto">Select skill proficiency.</p>
      <Field
        as="select"
        name="barbarianBonusSkillProficiencyTwo"
        aria-label="BarbarianBonusSkillProficiencyTwo"
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("barbarianBonusSkillProficiencyTwo", e.target.value);
        }}
        value={values.barbarianBonusSkillProficiencyTwo}
      >
        {skillChecks
          .filter(
            (skill) =>
              skill !== values.barbarianBonusSkillProficiencyOne &&
              skillsToChooseFrom.includes(skill)
          )
          .map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
      </Field>
      <ErrorMessage
        name="barbarianBonusSkillProficiencyTwo"
        component="div"
        className="error"
      />
    </div>
  );
};

export default BarbarianForm;
