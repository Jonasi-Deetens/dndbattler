import { ErrorMessage, Field, useFormikContext } from 'formik';
import React from 'react';
import { NewCharacter, DamageType } from '../../types/DBTypes';

const damageTypes = Object.values(DamageType);

const DamageTypeSelectField = ({
  name,
  filter,
  label,
  onChange,
  noDivider = false
}: {
  name: string;
  filter: (option: DamageType) => boolean;
  label: string;
  onChange: (value: DamageType) => void;
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
          onChange(e.target.value as DamageType);
        }}
        value={values[name]}
      >
        {damageTypes.filter(filter).map(option => (
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

export default DamageTypeSelectField;
