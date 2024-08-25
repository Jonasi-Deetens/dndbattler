import { ErrorMessage, Field, useFormikContext } from 'formik';
import React from 'react';
import { Alignment, NewCharacter } from '../../types/DBTypes';

const alignments = Object.values(Alignment);

const AlignmentSelectField = ({
  name,
  onChange,
  noDivider = true
}: {
  name: string;
  onChange: (value: Alignment) => void;
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
          onChange(e.target.value as Alignment);
        }}
        value={values[name]}
      >
        {alignments.map(option => (
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

export default AlignmentSelectField;
