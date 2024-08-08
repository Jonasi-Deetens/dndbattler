import { ErrorMessage, Field, useFormikContext } from "formik";
import React from "react";
import { FightingStyle, NewCharacter } from "../../types/DBTypes";

const fightingStyles = Object.values(FightingStyle);

const FightingStyleSelectField = ({
  name,
  filter,
  label,
  onChange,
  noDivider = false,
}: {
  name: string;
  filter: (option: FightingStyle) => boolean;
  label: string;
  onChange: (value: FightingStyle) => void;
  noDivider?: boolean;
}) => {
  const { values } = useFormikContext<NewCharacter>();

  return (
    <>
      <p className="border-b p-2 w-fit m-auto">{label}</p>
      <Field
        as="select"
        name={name}
        aria-label={name}
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          onChange(e.target.value as FightingStyle);
        }}
        value={values[name]}
      >
        {fightingStyles.filter(filter).map((option) => (
          <option key={option} value={option}>
            {option}
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

export default FightingStyleSelectField;
