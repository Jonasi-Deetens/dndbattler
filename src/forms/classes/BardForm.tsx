import { ErrorMessage, Field, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { NewCharacter, SkillChecks } from "../../types/DBTypes";

const skillChecks = Object.values(SkillChecks);

const BardForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();

  useEffect(() => {
    setFieldValue("bardBonusSkillProficiencyOne", skillChecks[0]);
    setFieldValue("bardBonusSkillProficiencyTwo", skillChecks[1]);
    setFieldValue("bardBonusSkillProficiencyThree", skillChecks[2]);
  }, []);

  return (
    <div>
      <h2 className="border p-2">BARD</h2>

      <p className="border-b p-2 w-fit m-auto">Select skill proficiency.</p>
      <Field
        as="select"
        name="bardBonusSkillProficiencyOne"
        aria-label="BardBonusSkillProficiencyOne"
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("bardBonusSkillProficiencyOne", e.target.value);
        }}
        value={values.bardBonusSkillProficiencyOne}
      >
        {skillChecks
          .filter(
            (skill) =>
              skill !== values.bardBonusSkillProficiencyTwo &&
              skill !== values.bardBonusSkillProficiencyThree
          )
          .map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
      </Field>
      <ErrorMessage
        name="bardBonusSkillProficiencyOne"
        component="div"
        className="error"
      />
      <hr className="border-dotted border-t-8 w-1/4 m-auto my-5" />
      <p className="border-b p-2 w-fit m-auto">Select skill proficiency.</p>
      <Field
        as="select"
        name="bardBonusSkillProficiencyTwo"
        aria-label="BardBonusSkillProficiencyTwo"
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("bardBonusSkillProficiencyTwo", e.target.value);
        }}
        value={values.bardBonusSkillProficiencyTwo}
      >
        {skillChecks
          .filter(
            (skill) =>
              skill !== values.bardBonusSkillProficiencyOne &&
              skill !== values.bardBonusSkillProficiencyThree
          )
          .map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
      </Field>
      <ErrorMessage
        name="bardBonusSkillProficiencyTwo"
        component="div"
        className="error"
      />
      <hr className="border-dotted border-t-8 w-1/4 m-auto my-5" />
      <p className="border-b p-2 w-fit m-auto">Select skill proficiency.</p>
      <Field
        as="select"
        name="bardBonusSkillProficiencyThree"
        aria-label="BardBonusSkillProficiencyThree"
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("bardBonusSkillProficiencyThree", e.target.value);
        }}
        value={values.bardBonusSkillProficiencyThree}
      >
        {skillChecks
          .filter(
            (skill) =>
              skill !== values.bardBonusSkillProficiencyOne &&
              skill !== values.bardBonusSkillProficiencyTwo
          )
          .map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
      </Field>
      <ErrorMessage
        name="bardBonusSkillProficiencyThree"
        component="div"
        className="error"
      />
    </div>
  );
};

export default BardForm;
