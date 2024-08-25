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
        <p className="border-b p-2 w-fit m-auto">
          Select 1 damage advantage type:
        </p>
        <DamageTypeSelectField
          name="draconicBloodlineAdvantage"
          filter={() => true}
          onChange={(value: DamageType) =>
            setFieldValue('draconicBloodlineAdvantage', value)
          }
        />
      </div>
    </div>
  );
};

export default DraconicBloodlineForm;
