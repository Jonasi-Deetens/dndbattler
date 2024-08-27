import { Field, useFormikContext } from 'formik';
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
    if (!values.characterAlignment)
      setFieldValue('characterAlignment', Alignment.LAWFUL_GOOD);
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
      <div className="w-1/2 m-auto">
        <h2 className="border p-2">BACKGROUND</h2>
        <p className="border-b p-2 w-fit m-auto">
          Tell us about your characters background:
        </p>
        <Field
          as="textarea"
          name="characterBackground"
          aria-label="Background"
          className="p-1 text-gray-500 mt-5 w-full"
          placeholder="E.g. Soldier from fortuna..."
        />
        <p className="border-b p-2 w-fit m-auto">Choose your alignment:</p>
        <AlignmentSelectField
          name="characterAlignment"
          onChange={(value: Alignment) =>
            setFieldValue('characterAlignment', value)
          }
        />
        <p className="border-b p-2 w-fit m-auto">Select 2 ideals:</p>
        <IdealSelectField
          name="characterIdealOne"
          filter={(option: Ideal) => option !== values.characterIdealTwo}
          onChange={(value: Ideal) => setFieldValue('characterIdealOne', value)}
        />
        <IdealSelectField
          name="characterIdealTwo"
          filter={(option: Ideal) => option !== values.characterIdealOne}
          onChange={(value: Ideal) => setFieldValue('characterIdealTwo', value)}
        />
        <p className="border-b p-2 w-fit m-auto">Select 2 bonds:</p>
        <BondSelectField
          name="characterBondOne"
          filter={(option: Bond) => option !== values.characterBondTwo}
          onChange={(value: Bond) => setFieldValue('characterBondOne', value)}
        />
        <BondSelectField
          name="characterBondTwo"
          filter={(option: Bond) => option !== values.characterBondOne}
          onChange={(value: Bond) => setFieldValue('characterBondTwo', value)}
        />
        <p className="border-b p-2 w-fit m-auto">Select 2 flaws:</p>
        <FlawSelectField
          name="characterFlawOne"
          filter={(option: Flaw) => option !== values.characterFlawTwo}
          onChange={(value: Flaw) => setFieldValue('characterFlawOne', value)}
        />
        <FlawSelectField
          name="characterFlawTwo"
          filter={(option: Flaw) => option !== values.characterFlawOne}
          onChange={(value: Flaw) => setFieldValue('characterFlawTwo', value)}
        />
        <p className="border-b p-2 w-fit m-auto">Select 2 fears:</p>
        <FearSelectField
          name="characterFearOne"
          filter={(option: Fear) => option !== values.characterFearTwo}
          onChange={(value: Fear) => setFieldValue('characterFearOne', value)}
        />
        <FearSelectField
          name="characterFearTwo"
          filter={(option: Fear) => option !== values.characterFearOne}
          onChange={(value: Fear) => setFieldValue('characterFearTwo', value)}
        />
        <p className="border-b p-2 w-fit m-auto">
          Tell us about your characters backstory:
        </p>
        <Field
          as="textarea"
          name="characterBackstory"
          aria-label="Backstory"
          className="p-1 text-gray-500 mt-5 w-full"
          placeholder="What's the story behind your character?"
        />
        <p className="border-b p-2 w-fit m-auto">
          Tell us about your characters appearance:
        </p>
        <Field
          as="textarea"
          name="characterAppearance"
          aria-label="Appearance"
          className="p-1 text-gray-500 mt-5 w-full"
          placeholder="E.g. Orc that looks like a unicorn, but green and ugly..."
        />
      </div>
    </div>
  );
};

export default BackgroundForm;
