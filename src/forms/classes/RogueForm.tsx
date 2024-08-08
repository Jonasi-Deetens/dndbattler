import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { NewCharacter, Item, SkillCheck } from "../../types/DBTypes";
import SkillCheckSelectField from "../../components/inputs/SkillCheckSelectField";
import ItemSelectField from "../../components/inputs/ItemSelectField";

const rogueSkillChoices = [
  "Acrobatics",
  "Athletics",
  "Deception",
  "Insight",
  "Intimidation",
  "Investigation",
  "Perception",
  "Performance",
  "Persuasion",
  "Sleight of Hand",
  "Stealth",
];

const RogueForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();

  const itemChoicesOne = ["Rapier", "Shortsword"];
  const itemChoicesTwo = ["Shortbow", "Shortsword"];
  const itemChoicesThree = [
    "Burglar's Pack",
    "Dungeoneer's Pack",
    "Explorer's Pack",
  ];

  useEffect(() => {
    if (!values.rogueSkillProficiencyOne)
      setFieldValue("rogueSkillProficiencyOne", rogueSkillChoices[0]);
    if (!values.rogueSkillProficiencyTwo)
      setFieldValue("rogueSkillProficiencyTwo", rogueSkillChoices[1]);
    if (!values.rogueSkillProficiencyThree)
      setFieldValue("rogueSkillProficiencyThree", rogueSkillChoices[2]);
    if (!values.rogueSkillProficiencyFour)
      setFieldValue("rogueSkillProficiencyFour", rogueSkillChoices[3]);
    if (!values.rogueSkillProficiencyFive)
      setFieldValue("rogueSkillProficiencyFive", rogueSkillChoices[4]);
    if (!values.rogueEquipmentOne)
      setFieldValue("rogueEquipmentOne", itemChoicesOne[0]);
    if (!values.rogueEquipmentTwo)
      setFieldValue("rogueEquipmentTwo", itemChoicesTwo[0]);
    if (!values.rogueEquipmentThree)
      setFieldValue("rogueEquipmentThree", itemChoicesThree[0]);
  }, []);

  return (
    <div>
      <h2 className="border p-2">Rogue</h2>

      <SkillCheckSelectField
        name="rogueSkillProficiencyOne"
        filter={(option: SkillCheck) =>
          option !== values.rogueSkillProficiencyTwo &&
          option !== values.rogueSkillProficiencyThree &&
          option !== values.rogueSkillProficiencyFour &&
          option !== values.rogueSkillProficiencyFive &&
          rogueSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillCheck) =>
          setFieldValue("rogueSkillProficiencyOne", value)
        }
      />
      <SkillCheckSelectField
        name="rogueSkillProficiencyTwo"
        filter={(option: SkillCheck) =>
          option !== values.rogueSkillProficiencyOne &&
          option !== values.rogueSkillProficiencyThree &&
          option !== values.rogueSkillProficiencyFour &&
          option !== values.rogueSkillProficiencyFive &&
          rogueSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillCheck) =>
          setFieldValue("rogueSkillProficiencyTwo", value)
        }
      />
      <SkillCheckSelectField
        name="rogueSkillProficiencyThree"
        filter={(option: SkillCheck) =>
          option !== values.rogueSkillProficiencyOne &&
          option !== values.rogueSkillProficiencyTwo &&
          option !== values.rogueSkillProficiencyFour &&
          option !== values.rogueSkillProficiencyFive &&
          rogueSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillCheck) =>
          setFieldValue("rogueSkillProficiencyThree", value)
        }
      />
      <SkillCheckSelectField
        name="rogueSkillProficiencyFour"
        filter={(option: SkillCheck) =>
          option !== values.rogueSkillProficiencyOne &&
          option !== values.rogueSkillProficiencyTwo &&
          option !== values.rogueSkillProficiencyThree &&
          option !== values.rogueSkillProficiencyFive &&
          rogueSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillCheck) =>
          setFieldValue("rogueSkillProficiencyFour", value)
        }
      />
      <SkillCheckSelectField
        name="rogueSkillProficiencyFive"
        filter={(option: SkillCheck) =>
          option !== values.rogueSkillProficiencyOne &&
          option !== values.rogueSkillProficiencyTwo &&
          option !== values.rogueSkillProficiencyThree &&
          option !== values.rogueSkillProficiencyFour &&
          rogueSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillCheck) =>
          setFieldValue("rogueSkillProficiencyFive", value)
        }
      />

      <ItemSelectField
        name="rogueEquipmentOne"
        filter={(option: Item) => itemChoicesOne.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("rogueEquipmentOne", value.name)
        }
      />
      <ItemSelectField
        name="rogueEquipmentTwo"
        filter={(option: Item) => itemChoicesTwo.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("rogueEquipmentTwo", value.name)
        }
      />
      <ItemSelectField
        name="rogueEquipmentThree"
        filter={(option: Item) => itemChoicesThree.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("rogueEquipmentThree", value.name)
        }
        noDivider={true}
      />
    </div>
  );
};

export default RogueForm;
