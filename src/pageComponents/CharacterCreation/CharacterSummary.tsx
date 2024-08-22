import { ErrorMessage, Field, useFormikContext } from 'formik';
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
        console.log(raceById);

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
        console.log(classById);

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
    <div className="flex flex-col items-center border-2 border-black p-5 bg-red-400 text-black">
      <Field
        type="text"
        name="name"
        placeholder="Name"
        aria-label="Name"
        autoComplete="name"
        className="p-1 text-gray-500 mb-4 mt-1"
      />
      <ErrorMessage name="name" component="div" className="error" />

      <img className="w-32 h-32 border-2 border-black" src={raceImage} alt="" />
      {race &&
        (subrace ? (
          <div>
            <h2 className="font-bold border border-black my-4 py-2">
              {subrace.name}
            </h2>
            <p>{subrace.description}</p>
          </div>
        ) : (
          <div>
            <h2 className="font-bold border border-black my-4 py-2">
              {race.name}
            </h2>
            <p>{race.description}</p>
          </div>
        ))}

      {charClass && (
        <div>
          <hr className="w-full border-black my-5" />
          <img
            className="w-32 h-32 border-2 border-black"
            src={classImage}
            alt=""
          />
        </div>
      )}
      {charClass &&
        (subclass ? (
          <div>
            <h2 className="font-bold border border-black my-4 py-2">
              {subclass.name}
            </h2>
            <p>{subclass.description}</p>
          </div>
        ) : (
          <div>
            <h2 className="font-bold border border-black my-4 py-2">
              {charClass.name}
            </h2>
            <p>{charClass.description}</p>
          </div>
        ))}
    </div>
  );
};

export default CharacterSummary;
