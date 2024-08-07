import { ErrorMessage, Field, useFormikContext } from "formik";
import React from "react";
import { NewCharacter, Item } from "../../types/DBTypes";
import useItems from "../../hooks/useItems";

const ItemSelectField = ({
  name,
  filter,
  label,
  onChange,
  noDivider = false,
}: {
  name: string;
  filter: (option: Item) => boolean;
  label: string;
  onChange: (value: Item) => void;
  noDivider?: boolean;
}) => {
  const { items = [] } = useItems();
  const { values } = useFormikContext<NewCharacter>();
  return (
    <>
      <p className="border-b p-2 w-fit m-auto">{label}</p>
      <Field
        as="select"
        name={name}
        aria-label={name}
        className="p-1 text-gray-500 mt-5"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const selectedItem = items.find(
            (item) => item.name === e.target.value
          );
          if (selectedItem) {
            onChange(selectedItem);
          }
        }}
        value={values[name]}
      >
        {items &&
          items.filter(filter).map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
      </Field>
      <ErrorMessage name={name} component="div" className="error" />
      {!noDivider && (
        <hr className="border-dotted border-t-8 w-1/4 m-auto my-5" />
      )}
    </>
  );
};

export default ItemSelectField;
