import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import useSubclasses from '../../hooks/useSubclasses';
import useClasses from '../../hooks/useClasses';
import { NewCharacter } from '../../types/DBTypes';
import useClassImages from '../../hooks/useClassImages';

const StepThree: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { classes } = useClasses();
  const { subclasses } = useSubclasses();
  const { classImages, subclassImages } = useClassImages();
  const [hasSubclasses, setHasSubclasses] = useState<boolean>(false);
  const [subclassAtLevelOne, setSubclassAtLevelOne] = useState<boolean>(false);

  useEffect(() => {
    if (classes && classes.length > 0 && !values.classId) {
      setFieldValue('classId', classes[0].id);
    }
  }, [classes, values.classId, setFieldValue]);

  useEffect(() => {
    const matchingSubclasses = subclasses.filter(
      subclass => subclass.parentClassId === values.classId
    );
    setHasSubclasses(matchingSubclasses.length > 0);
    if (
      matchingSubclasses.length > 0 &&
      !values.subclassId &&
      subclassAtLevelOne
    ) {
      setFieldValue('subclassId', matchingSubclasses[0].id);
    }
  }, [
    subclasses,
    values.classId,
    values.subclassId,
    setFieldValue,
    subclassAtLevelOne
  ]);

  const handleClassSelect = (newClassId: number) => {
    const selectedClass = classes.find(
      charClass => charClass.id === newClassId
    );
    setSubclassAtLevelOne(
      selectedClass ? selectedClass.subClassAvailableAtLevel === 1 : false
    );
    setFieldValue('classId', newClassId);

    const matchingSubclasses = subclasses.filter(
      subclass => subclass.parentClassId === newClassId
    );
    setHasSubclasses(matchingSubclasses.length > 0);
    if (
      matchingSubclasses.length > 0 &&
      selectedClass?.subClassAvailableAtLevel === 1
    ) {
      setFieldValue('subclassId', matchingSubclasses[0].id);
    } else {
      setFieldValue('subclassId', undefined);
    }
  };

  const handleSubclassSelect = (newSubclassId: number) => {
    setFieldValue('subclassId', newSubclassId);
  };

  return (
    <div className="flex flex-col gap-y-5">
      <h2 className="border p-2">Select your class</h2>
      <div className="flex flex-wrap w-full justify-center gap-4">
        {classes &&
          classes.map(charClass => (
            <div className="flex flex-col">
              <button
                key={charClass.id}
                type="button"
                onClick={() => handleClassSelect(charClass.id)}
                className="bg-transparent border-0"
              >
                <img
                  src={classImages[charClass.id]}
                  alt={charClass.name}
                  className={`h-24 w-24 object-cover flex flex-col items-center hover:shadow-red-100 hover:shadow-md hover:scale-110 rounded-md ${
                    values.classId === charClass.id
                      ? 'border-4 border-red-400 scale-110'
                      : 'border-0'
                  }`}
                />
              </button>
              <span>{charClass.name}</span>
            </div>
          ))}
      </div>
      {hasSubclasses && subclassAtLevelOne && (
        <>
          <h2 className="border p-2">Select your subclass</h2>
          <div className="flex flex-wrap w-full justify-center gap-4">
            {subclasses &&
              subclasses
                .filter(option => option.parentClassId === values.classId)
                .map(subclass => (
                  <div className="flex flex-col">
                    <button
                      key={subclass.id}
                      type="button"
                      onClick={() => handleSubclassSelect(subclass.id)}
                      className="bg-transparent border-0"
                    >
                      <img
                        src={subclassImages[subclass.id]}
                        alt={subclass.name}
                        className={`h-24 w-24 object-cover flex flex-col items-center hover:shadow-red-100 hover:shadow-md hover:scale-110 rounded-md ${
                          values.subclassId === subclass.id
                            ? 'border-4 border-red-400 scale-110'
                            : 'border-0'
                        }`}
                      />
                    </button>
                    <span>{subclass.name}</span>
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StepThree;
