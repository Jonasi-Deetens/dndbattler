import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { NewCharacter, DamageType } from '../../../types/DBTypes';
import DamageTypeSelectField from '../../../components/inputs/DamageTypeSelectField';

const DraconicBloodlineForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();

  useEffect(() => {
    if (!values.draconicBloodlineAdvantage) {
      setFieldValue('draconicBloodlineAdvantage', DamageType.FIRE);
    }
  }, [setFieldValue, values.draconicBloodlineAdvantage]);

  return (
    <div>
      <h2 className="border p-2">Draconic Bloodline</h2>

      <div className="w-1/2 m-auto">
        <DamageTypeSelectField
          name="draconicBloodlineAdvantage"
          filter={() => true}
          label="Select a damage type for advantage."
          onChange={(value: DamageType) =>
            setFieldValue('draconicBloodlineAdvantage', value)
          }
        />
      </div>
    </div>
  );
};

export default DraconicBloodlineForm;
