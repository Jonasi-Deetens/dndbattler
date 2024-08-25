import { ErrorMessage, Field, useFormikContext } from 'formik';
import React from 'react';
import { NewCharacter, Ideal } from '../../types/DBTypes';

const ideals = Object.values(Ideal);

const IdealSelectField = ({
  name,
  filter,
  onChange,
  noDivider = true
}: {
  name: string;
  filter: (option: Ideal) => boolean;
  onChange: (value: Ideal) => void;
  noDivider?: boolean;
}) => {
  const { values } = useFormikContext<NewCharacter>();

  return (
    <>
      <Field
        as="select"
        name={name}
        aria-label={name}
        className="p-1 text-gray-500 mt-5 w-full"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          onChange(e.target.value as Ideal);
        }}
        value={values[name]}
      >
        {ideals.filter(filter).map(option => (
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

export default IdealSelectField;
