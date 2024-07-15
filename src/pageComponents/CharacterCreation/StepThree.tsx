import { ErrorMessage, Field, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import useSubclasses from '../../hooks/useSubclasses';
import { NewCharacter } from '../../types/DBTypes';
import useClasses from '../../hooks/useClasses';

const StepThree: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { classes } = useClasses();
  const { subclasses } = useSubclasses();
  const [hasSubclasses, setHasSubclasses] = useState<boolean>(true);

  useEffect(() => {
    if (classes && classes.length > 0 && !values.classId)
      setFieldValue('classId', classes[0].id);
  }, [classes, values.classId, setFieldValue]);

  useEffect(() => {
    const matchingSubclasses = subclasses.filter(
      subclass => subclass.parentClassId === values.classId
    );
    setHasSubclasses(matchingSubclasses.length > 0);
    if (matchingSubclasses.length > 0 && !values.subclassId) {
      setFieldValue('subclassId', matchingSubclasses[0].id);
    }
  }, [subclasses, values.classId, values.subclassId, setFieldValue]);

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newClassId = parseInt(e.target.value);
    setFieldValue('classId', newClassId);
    const matchingSubclasses = subclasses.filter(
      subclass => subclass.parentClassId === newClassId
    );
    setHasSubclasses(matchingSubclasses.length > 0);
    if (matchingSubclasses.length > 0) {
      setFieldValue('subclassId', matchingSubclasses[0].id);
    } else {
      setFieldValue('subclassId', undefined);
    }
  };

  const handSubclassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue('subclassId', parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col gap-y-5">
      <h2 className="border p-2">Select your class & subclass</h2>
      <Field
        as="select"
        name="classId"
        aria-label="Class"
        className="p-1 text-gray-500"
        onChange={handleClassChange}
      >
        {classes &&
          classes.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
      </Field>
      <ErrorMessage name="classId" component="div" className="error" />
      {hasSubclasses && (
        <>
          <Field
            as="select"
            name="subclassId"
            aria-label="Subclass"
            className="p-1 text-gray-500"
            onChange={handSubclassChange}
          >
            {subclasses &&
              subclasses.map(option => {
                if (option.parentClassId === values.classId) {
                  return (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  );
                }
              })}
          </Field>
          <ErrorMessage name="subclassId" component="div" className="error" />
        </>
      )}
    </div>
  );
};

export default StepThree;
