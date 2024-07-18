import { ErrorMessage, Field, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import {
  NewCharacter,
  Alignment,
  Ideal,
  Bond,
  Flaw,
  Fear
} from '../types/DBTypes';
import AlignmentSelectField from '../components/inputs/AlignmentSelectField';
import IdealSelectField from '../components/inputs/IdealSelectField';
import BondSelectField from '../components/inputs/BondSelectField';
import FlawSelectField from '../components/inputs/FlawSelectField';
import FearSelectField from '../components/inputs/FearSelectField';

const BackgroundForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();

  useEffect(() => {
    if (!values.characterIdealOne)
      setFieldValue('characterIdealOne', Ideal.FAIRNESS);
    if (!values.characterIdealTwo)
      setFieldValue('characterIdealTwo', Ideal.RESPECT);
    if (!values.characterBondOne)
      setFieldValue('characterBondOne', Bond.FAMILY);
    if (!values.characterBondTwo) setFieldValue('characterBondTwo', Bond.HONOR);
    if (!values.characterFlawOne)
      setFieldValue('characterFlawOne', Flaw.COWARDICE);
    if (!values.characterFlawTwo) setFieldValue('characterFlawTwo', Flaw.GREED);
    if (!values.characterFearOne)
      setFieldValue('characterFearOne', Fear.FAILURE);
    if (!values.characterFearTwo)
      setFieldValue('characterFearTwo', Fear.LOSING_PEOPLE);
  }, []);

  return (
    <div className="flex flex-col gap-y-5">
      <label className="border-b p-2 w-fit m-auto">Background</label>
      <Field
        as="textarea"
        name="characterBackground"
        aria-label="Background"
        className="p-1 text-gray-500 mt-5"
        placeholder="E.g. Soldier from fortuna..."
      />
      <ErrorMessage
        name="characterBackground"
        component="div"
        className="error"
      />
      <hr className="border-dotted border-t-8 w-1/4 m-auto my-5" />
      <AlignmentSelectField
        name="characterAlignment"
        label="Select your alignment"
        onChange={(value: Alignment) =>
          setFieldValue('characterAlignment', value)
        }
      />
      <IdealSelectField
        name="characterIdealOne"
        filter={(option: Ideal) => option !== values.characterIdealTwo}
        label="Select your first ideal"
        onChange={(value: Ideal) => setFieldValue('characterIdealOne', value)}
      />
      <IdealSelectField
        name="characterIdealTwo"
        filter={(option: Ideal) => option !== values.characterIdealOne}
        label="Select your second ideal"
        onChange={(value: Ideal) => setFieldValue('characterIdealTwo', value)}
      />
      <BondSelectField
        name="characterBondOne"
        filter={(option: Bond) => option !== values.characterBondTwo}
        label="Select your first bond"
        onChange={(value: Bond) => setFieldValue('characterBondOne', value)}
      />
      <BondSelectField
        name="characterBondTwo"
        filter={(option: Bond) => option !== values.characterBondOne}
        label="Select your second bond"
        onChange={(value: Bond) => setFieldValue('characterBondTwo', value)}
      />
      <FlawSelectField
        name="characterFlawOne"
        filter={(option: Flaw) => option !== values.characterFlawTwo}
        label="Select your first flaw"
        onChange={(value: Flaw) => setFieldValue('characterFlawOne', value)}
      />
      <FlawSelectField
        name="characterFlawTwo"
        filter={(option: Flaw) => option !== values.characterFlawOne}
        label="Select your second flaw"
        onChange={(value: Flaw) => setFieldValue('characterFlawTwo', value)}
      />
      <FearSelectField
        name="characterFearOne"
        filter={(option: Fear) => option !== values.characterFearTwo}
        label="Select your first fear"
        onChange={(value: Fear) => setFieldValue('characterFearOne', value)}
      />
      <FearSelectField
        name="characterFearTwo"
        filter={(option: Fear) => option !== values.characterFearOne}
        label="Select your second fear"
        onChange={(value: Fear) => setFieldValue('characterFearTwo', value)}
        noDivider={true}
      />
      <label className="border-b p-2 w-fit m-auto">Backstory</label>
      <Field
        as="textarea"
        name="characterBackstory"
        aria-label="Backstory"
        className="p-1 text-gray-500 mt-5"
        placeholder="What's the story behind your character?"
      />
      <ErrorMessage
        name="characterBackstory"
        component="div"
        className="error"
      />

      <label className="border-b p-2 w-fit m-auto">Appearance</label>
      <Field
        as="textarea"
        name="characterAppearance"
        aria-label="Appearance"
        className="p-1 text-gray-500 mt-5"
        placeholder="E.g. Orc that looks like a unicorn, but green and ugly..."
      />
      <ErrorMessage
        name="characterAppearance"
        component="div"
        className="error"
      />
    </div>
  );
};

export default BackgroundForm;
