import { ErrorMessage, Field, useFormikContext } from "formik";
import React from "react";
import { NewCharacter } from "../../types/DBTypes";

const DwarfForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const toolOptions = ["Smith's Tools", "Brewer's Supplies", "Mason's Tools"];

  return (
    <div>
      <h2 className="border p-2">DWARF</h2>

      <p className="border-b p-2">
        Select 1 out of the following 3 tools, you will be proficient with
        those.
      </p>
      <Field
        as="select"
        name="dwarfToolProficiency"
        aria-label="DwarfToolProficiency"
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("dwarfToolProficiency", e.target.value);
        }}
        value={values.dwarfToolProficiency}
      >
        {toolOptions &&
          toolOptions.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
      </Field>
      <ErrorMessage
        name="dwarfToolProficiency"
        component="div"
        className="error"
      />
    </div>
  );
};

export default DwarfForm;
