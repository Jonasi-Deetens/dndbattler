import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { NewCharacter, SkillChecks, Item } from "../../types/DBTypes";
import SkillCheckSelectField from "../../components/inputs/SkillCheckSelectField";
import ItemSelectField from "../../components/inputs/ItemSelectField";

const monkSkillChoices = [
  "Acrobatics",
  "Athletics",
  "History",
  "Insight",
  "Religion",
  "Stealth",
];

const MonkForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();

  const itemChoicesOne = ["Shortsword", "Simple Weapon"];
  const itemChoicesTwo = ["Dungeoneer's Pack", "Explorer's Pack"];
  const proficiencyChoices = ["Tool", "Musical Instrument"];

  useEffect(() => {
    if (!values.monkSkillProficiencyOne)
      setFieldValue("monkSkillProficiencyOne", monkSkillChoices[0]);
    if (!values.monkSkillProficiencyTwo)
      setFieldValue("monkSkillProficiencyTwo", monkSkillChoices[1]);
    if (!values.monkEquipmentOne)
      setFieldValue("monkEquipmentOne", itemChoicesOne[0]);
    if (!values.monkEquipmentTwo)
      setFieldValue("monkEquipmentTwo", itemChoicesTwo[0]);
    if (!values.monkProficiency)
      setFieldValue("monkProficiency", monkSkillChoices[1]);
  }, []);

  return (
    <div>
      <h2 className="border p-2">Monk</h2>

      <SkillCheckSelectField
        name="monkSkillProficiencyOne"
        filter={(option: SkillChecks) =>
          option !== values.monkSkillProficiencyTwo &&
          monkSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillChecks) =>
          setFieldValue("monkSkillProficiencyOne", value)
        }
      />
      <SkillCheckSelectField
        name="monkSkillProficiencyTwo"
        filter={(option: SkillChecks) =>
          option !== values.monkSkillProficiencyOne &&
          monkSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillChecks) =>
          setFieldValue("monkSkillProficiencyTwo", value)
        }
      />

      <ItemSelectField
        name="monkEquipmentOne"
        filter={(option: Item) =>
          itemChoicesOne.includes(option.name) ||
          itemChoicesOne.includes(option.type)
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("monkEquipmentOne", value.name)
        }
      />
      <ItemSelectField
        name="monkEquipmentTwo"
        filter={(option: Item) => itemChoicesTwo.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("monkEquipmentTwo", value.name)
        }
      />

      <ItemSelectField
        name="monkProficiency"
        filter={(option: Item) =>
          proficiencyChoices.includes(option.name) ||
          proficiencyChoices.includes(option.type)
        }
        label="Select item proficiency."
        onChange={(value: Item) => setFieldValue("monkProficiency", value.name)}
        noDivider={true}
      />
    </div>
  );
};

export default MonkForm;
