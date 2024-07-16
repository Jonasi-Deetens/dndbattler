import { ErrorMessage, Field, useFormikContext } from 'formik';
import React from 'react';
import { NewCharacter, Language } from '../../types/DBTypes';
import useLanguages from '../../hooks/useLanguages';

const LanguageSelectField = ({
  name,
  filter,
  label,
  onChange,
  noDivider = false
}: {
  name: string;
  filter: (option: Language) => boolean;
  label: string;
  onChange: (value: Language) => void;
  noDivider?: boolean;
}) => {
  const { languages = [] } = useLanguages();
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
          const selectedLanguage = languages.find(
            language => language.id === parseInt(e.target.value)
          );
          if (selectedLanguage) {
            onChange(selectedLanguage);
          }
        }}
        value={values[name]}
      >
        {languages &&
          languages.filter(filter).map(option => (
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

export default LanguageSelectField;
