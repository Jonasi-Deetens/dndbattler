import { ErrorMessage, Field, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import useSubclasses from "../../hooks/useSubclasses";
import useClasses from "../../hooks/useClasses";
import { NewCharacter } from "../../types/DBTypes";

const StepThree: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { classes } = useClasses();
  const { subclasses } = useSubclasses();
  const [hasSubclasses, setHasSubclasses] = useState<boolean>(false);
  const [subclassAtLevelOne, setSubclassAtLevelOne] = useState<boolean>(false);

  useEffect(() => {
    if (classes && classes.length > 0 && !values.classId) {
      setFieldValue("classId", classes[0].id);
    }
  }, [classes, values.classId, setFieldValue]);

  useEffect(() => {
    const matchingSubclasses = subclasses.filter(
      (subclass) => subclass.parentClassId === values.classId
    );
    setHasSubclasses(matchingSubclasses.length > 0);
    if (
      matchingSubclasses.length > 0 &&
      !values.subclassId &&
      subclassAtLevelOne
    ) {
      setFieldValue("subclassId", matchingSubclasses[0].id);
    }
  }, [
    subclasses,
    values.classId,
    values.subclassId,
    setFieldValue,
    subclassAtLevelOne,
  ]);

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newClassId = parseInt(e.target.value);
    const selectedClass = classes.find(
      (charClass) => charClass.id === newClassId
    );
    setSubclassAtLevelOne(
      selectedClass ? selectedClass.subClassAvailableAtLevel === 1 : false
    );
    setFieldValue("classId", newClassId);

    const matchingSubclasses = subclasses.filter(
      (subclass) => subclass.parentClassId === newClassId
    );
    setHasSubclasses(matchingSubclasses.length > 0);
    if (matchingSubclasses.length > 0 && subclassAtLevelOne) {
      setFieldValue("subclassId", matchingSubclasses[0].id);
    } else {
      setFieldValue("subclassId", undefined);
    }
  };

  const handleSubclassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue("subclassId", parseInt(e.target.value));
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
          classes.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
      </Field>
      <ErrorMessage name="classId" component="div" className="error" />
      {hasSubclasses && subclassAtLevelOne && (
        <>
          <Field
            as="select"
            name="subclassId"
            aria-label="Subclass"
            className="p-1 text-gray-500"
            onChange={handleSubclassChange}
          >
            {subclasses &&
              subclasses
                .filter((option) => option.parentClassId === values.classId)
                .map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
          </Field>
          <ErrorMessage name="subclassId" component="div" className="error" />
        </>
      )}
    </div>
  );
};

export default StepThree;
