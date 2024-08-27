import { Field, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import useRaceImages from '../../hooks/useRaceImages';
import {
  Class,
  NewCharacter,
  Race,
  Subclass,
  Subrace
} from '../../types/DBTypes';
import useRaces from '../../hooks/useRaces';
import useSubraces from '../../hooks/useSubraces';
import useSubclasses from '../../hooks/useSubclasses';
import useClasses from '../../hooks/useClasses';
import useClassImages from '../../hooks/useClassImages';

const CharacterSummary: React.FC = () => {
  const { values } = useFormikContext<NewCharacter>();
  const { getImageByRaceAndGender } = useRaceImages();
  const { getImageByClass } = useClassImages();
  const { getRaceById } = useRaces();
  const { getSubraceById } = useSubraces();
  const { getClassById } = useClasses();
  const { getSubclassById } = useSubclasses();
  const [race, setRace] = useState<Race>();
  const [subrace, setSubrace] = useState<Subrace>();
  const [charClass, setCharClass] = useState<Class>();
  const [subclass, setSubclass] = useState<Subclass>();
  const [raceImage, setRaceImage] = useState<string>();
  const [classImage, setClassImage] = useState<string>();

  useEffect(() => {
    const getRaceAndSubrace = async () => {
      try {
        const raceById = await getRaceById({ id: values.raceId });
        setRace(raceById);
        setSubrace(undefined);

        if (values.subraceId) {
          const subraceById = await getSubraceById({ id: values.subraceId });
          setSubrace(subraceById);
        }
      } catch (error) {
        console.error('Error fetching race or subrace:', error);
      }
    };

    if (values.raceId) {
      getRaceAndSubrace();
    }
  }, [values.raceId, values.subraceId]);

  useEffect(() => {
    const getClassAndSubclass = async () => {
      try {
        const classById = await getClassById({ id: values.classId });
        setCharClass(classById);
        setSubclass(undefined);

        if (values.subclassId) {
          const subclassById = await getSubclassById({ id: values.subclassId });
          setSubclass(subclassById);
        }
      } catch (error) {
        console.error('Error fetching class or subclass:', error);
      }
    };

    if (values.classId) {
      getClassAndSubclass();
    }
  }, [values.classId, values.subclassId]);

  useEffect(() => {
    if (values.raceId) {
      let image = '';
      if (values.subraceId)
        image = getImageByRaceAndGender({
          raceId: values.raceId,
          subraceId: values.subraceId,
          gender: values.gender
        });
      else
        image = getImageByRaceAndGender({
          raceId: values.raceId,
          gender: values.gender
        });
      setRaceImage(image);
    }
  }, [values.raceId, values.subraceId, getImageByRaceAndGender, values.gender]);

  useEffect(() => {
    if (values.classId) {
      let image = '';
      if (values.subclassId)
        image = getImageByClass({
          classId: values.classId,
          subclassId: values.subclassId
        });
      else
        image = getImageByClass({
          classId: values.classId
        });
      setClassImage(image);
    }
  }, [values.classId, values.subclassId, getImageByClass]);

  return (
    <div className="flex flex-col items-center border-2 border-yellow-500 p-6 rounded-lg shadow-lg bg-gray-800 text-neutral-100">
      {/* Name Input */}
      <Field
        type="text"
        name="name"
        placeholder="Character Name"
        aria-label="Name"
        autoComplete="name"
        className="p-2 text-gray-900 bg-neutral-50 rounded-md mb-5 w-full text-center border border-yellow-500 focus:outline-none"
      />

      {/* Race Image */}
      {raceImage && (
        <img
          className="w-32 h-32 mt-2 mb-4 border-4 border-yellow-500 rounded-full object-cover shadow-md"
          src={raceImage}
          alt={`${race?.name || ''} Image`}
        />
      )}

      {/* Race and Subrace Description */}
      {race && (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">
            {subrace ? subrace.name : race.name}
          </h2>
          <p className="text-sm text-neutral-300">
            {subrace?.description || race.description}
          </p>
        </div>
      )}

      {/* Divider */}
      {charClass && (
        <>
          <hr className="w-full border-yellow-500 my-6" />

          {/* Class Image */}
          {classImage && (
            <img
              className="w-32 h-32 mb-4 border-4 border-yellow-500 rounded-full object-cover shadow-md"
              src={classImage}
              alt={`${charClass?.name || ''} Image`}
            />
          )}

          {/* Class and Subclass Description */}
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">
              {subclass ? subclass.name : charClass.name}
            </h2>
            <p className="text-sm text-neutral-300">
              {subclass?.description || charClass?.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterSummary;
