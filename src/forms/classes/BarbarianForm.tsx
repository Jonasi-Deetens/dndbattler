import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { NewCharacter, SkillChecks, Item } from "../../types/DBTypes";
import SkillCheckSelectField from "../../components/inputs/SkillCheckSelectField";
import ItemSelectField from "../../components/inputs/ItemSelectField";

const barbarianSkillChoices = [
  "Animal Handling",
  "Athletics",
  "Intimidation",
  "Nature",
  "Perception",
  "Survival",
];

const BarbarianForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();

  const itemChoicesOne = ["Greataxe", "Martial Weapon"];
  const itemChoicesTwo = ["Handaxe", "Simple Weapon"];

  useEffect(() => {
    if (!values.barbarianBonusSkillProficiencyOne)
      setFieldValue(
        "barbarianBonusSkillProficiencyOne",
        barbarianSkillChoices[0]
      );
    if (!values.barbarianBonusSkillProficiencyTwo)
      setFieldValue(
        "barbarianBonusSkillProficiencyTwo",
        barbarianSkillChoices[1]
      );
    if (!values.barbarianEquipmentOne)
      setFieldValue("barbarianEquipmentOne", itemChoicesOne[0]);
    if (!values.barbarianEquipmentTwo)
      setFieldValue("barbarianEquipmentTwo", itemChoicesTwo[0]);
  }, []);

  return (
    <div>
      <h2 className="border p-2">Barbarian</h2>

      <SkillCheckSelectField
        name="barbarianBonusSkillProficiencyOne"
        filter={(option: SkillChecks) =>
          option !== values.barbarianBonusSkillProficiencyTwo &&
          barbarianSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillChecks) =>
          setFieldValue("barbarianBonusSkillProficiencyOne", value)
        }
      />
      <SkillCheckSelectField
        name="barbarianBonusSkillProficiencyTwo"
        filter={(option: SkillChecks) =>
          option !== values.barbarianBonusSkillProficiencyOne &&
          barbarianSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillChecks) =>
          setFieldValue("barbarianBonusSkillProficiencyTwo", value)
        }
      />
      <ItemSelectField
        name="barbarianEquipmentOne"
        filter={(option: Item) =>
          option.name !== values.barbarianEquipmentTwo &&
          (itemChoicesOne.includes(option.name) ||
            itemChoicesOne.includes(option.type)) &&
          option.rangeType === "Melee"
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("barbarianEquipmentOne", value.name)
        }
      />
      <ItemSelectField
        name="barbarianEquipmentTwo"
        filter={(option: Item) =>
          option.name !== values.barbarianEquipmentOne &&
          (itemChoicesTwo.includes(option.name) ||
            itemChoicesTwo.includes(option.type))
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("barbarianEquipmentTwo", value.name)
        }
        noDivider={true}
      />
    </div>
  );
};

export default BarbarianForm;
