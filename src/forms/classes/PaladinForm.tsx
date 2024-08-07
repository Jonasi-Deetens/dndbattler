import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { NewCharacter, SkillChecks, Item } from "../../types/DBTypes";
import SkillCheckSelectField from "../../components/inputs/SkillCheckSelectField";
import ItemSelectField from "../../components/inputs/ItemSelectField";

const paladinSkillChoices = [
  "Athletics",
  "Insight",
  "Intimidation",
  "Medicine",
  "Persuasion",
  "Religion",
];

const PaladinForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();

  const itemChoicesOne = ["Martial Weapon"];
  const itemChoicesTwo = ["Martial Weapon", "Shield"];
  const itemChoicesThree = ["Javelin", "Simple Weapon"];
  const itemChoicesFour = ["Priest's Pack", "Explorer's Pack"];

  useEffect(() => {
    if (!values.paladinBonusSkillProficiencyOne)
      setFieldValue("paladinBonusSkillProficiencyOne", paladinSkillChoices[0]);
    if (!values.paladinBonusSkillProficiencyTwo)
      setFieldValue("paladinBonusSkillProficiencyTwo", paladinSkillChoices[1]);
    if (!values.paladinEquipmentOne)
      setFieldValue("paladinEquipmentOne", itemChoicesOne[0]);
    if (!values.paladinEquipmentTwo)
      setFieldValue("paladinEquipmentTwo", itemChoicesTwo[0]);
    if (!values.paladinEquipmentThree)
      setFieldValue("paladinEquipmentThree", itemChoicesThree[0]);
    if (!values.paladinEquipmentFour)
      setFieldValue("paladinEquipmentFour", itemChoicesFour[0]);
  }, []);

  return (
    <div>
      <h2 className="border p-2">Paladin</h2>

      <SkillCheckSelectField
        name="paladinBonusSkillProficiencyOne"
        filter={(option: SkillChecks) =>
          option !== values.paladinBonusSkillProficiencyTwo &&
          paladinSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillChecks) =>
          setFieldValue("paladinBonusSkillProficiencyOne", value)
        }
      />
      <SkillCheckSelectField
        name="paladinBonusSkillProficiencyTwo"
        filter={(option: SkillChecks) =>
          option !== values.paladinBonusSkillProficiencyOne &&
          paladinSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillChecks) =>
          setFieldValue("paladinBonusSkillProficiencyTwo", value)
        }
      />

      <ItemSelectField
        name="paladinEquipmentOne"
        filter={(option: Item) =>
          itemChoicesOne.includes(option.name) ||
          itemChoicesOne.includes(option.type)
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("paladinEquipmentOne", value.name)
        }
      />
      <ItemSelectField
        name="paladinEquipmentTwo"
        filter={(option: Item) =>
          itemChoicesTwo.includes(option.name) ||
          itemChoicesTwo.includes(option.type)
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("paladinEquipmentTwo", value.name)
        }
      />
      <ItemSelectField
        name="paladinEquipmentThree"
        filter={(option: Item) =>
          itemChoicesThree.includes(option.name) ||
          (itemChoicesThree.includes(option.type) &&
            option.rangeType === "Melee")
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("paladinEquipmentThree", value.name)
        }
      />
      <ItemSelectField
        name="paladinEquipmentFour"
        filter={(option: Item) => itemChoicesFour.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("paladinEquipmentFour", value.name)
        }
        noDivider={true}
      />
    </div>
  );
};

export default PaladinForm;
