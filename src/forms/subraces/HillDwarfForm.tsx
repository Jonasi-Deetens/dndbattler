import { ErrorMessage, Field } from "formik";
import React from "react";

const HillDwarfForm: React.FC = () => {
  return (
    <div>
      <h2>HILL DWARF</h2>

      <Field
        type="text"
        name="name"
        placeholder="Name"
        aria-label="Name"
        autoComplete="name"
        className="p-1 text-gray-500"
      />
      <ErrorMessage name="name" component="div" className="error" />
    </div>
  );
};

export default HillDwarfForm;
