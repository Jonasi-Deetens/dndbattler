import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import {
  NewCharacter,
  SkillChecks,
  Item,
  FightingStyle,
} from "../../types/DBTypes";
import SkillCheckSelectField from "../../components/inputs/SkillCheckSelectField";
import ItemSelectField from "../../components/inputs/ItemSelectField";
import FightingStyleSelectField from "../../components/inputs/FightingStyleSelectField";

const fighterSkillChoices = [
  "Acrobatics",
  "Animal Handling",
  "Athletics",
  "History",
  "Insight",
  "Intimidation",
  "Perception",
  "Survival",
];

const FighterForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();

  const itemChoicesOne = ["Chain Mail", "Leather Armor"];
  const itemChoicesTwo = ["Martial Weapon"];
  const itemChoicesThree = ["Shield", "Martial Weapon"];
  const itemChoicesFour = ["Crossbow, Light", "Handaxe"];
  const itemChoicesFive = ["Dungeoneer's Pack", "Explorer's Pack"];

  useEffect(() => {
    if (!values.fighterBonusSkillProficiencyOne)
      setFieldValue("fighterBonusSkillProficiencyOne", fighterSkillChoices[0]);
    if (!values.fighterBonusSkillProficiencyTwo)
      setFieldValue("fighterBonusSkillProficiencyTwo", fighterSkillChoices[1]);
    if (!values.fighterEquipmentOne)
      setFieldValue("fighterEquipmentOne", itemChoicesOne[0]);
    if (!values.fighterEquipmentTwo)
      setFieldValue("fighterEquipmentTwo", itemChoicesTwo[0]);
    if (!values.fighterEquipmentThree)
      setFieldValue("fighterEquipmentThree", itemChoicesThree[0]);
    if (!values.fighterEquipmentFour)
      setFieldValue("fighterEquipmentFour", itemChoicesFour[0]);
    if (!values.fighterEquipmentFive)
      setFieldValue("fighterEquipmentFive", itemChoicesFive[0]);
    if (!values.fighterFightingStyle)
      setFieldValue("fighterFightingStyle", FightingStyle.ARCHERY);
  }, []);

  return (
    <div>
      <h2 className="border p-2">Fighter</h2>

      <SkillCheckSelectField
        name="fighterBonusSkillProficiencyOne"
        filter={(option: SkillChecks) =>
          option !== values.fighterBonusSkillProficiencyTwo &&
          fighterSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillChecks) =>
          setFieldValue("fighterBonusSkillProficiencyOne", value)
        }
      />
      <SkillCheckSelectField
        name="fighterBonusSkillProficiencyTwo"
        filter={(option: SkillChecks) =>
          option !== values.fighterBonusSkillProficiencyOne &&
          fighterSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillChecks) =>
          setFieldValue("fighterBonusSkillProficiencyTwo", value)
        }
      />

      <ItemSelectField
        name="fighterEquipmentOne"
        filter={(option: Item) => itemChoicesOne.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("fighterEquipmentOne", value.name)
        }
      />
      <ItemSelectField
        name="fighterEquipmentTwo"
        filter={(option: Item) =>
          itemChoicesTwo.includes(option.name) ||
          itemChoicesTwo.includes(option.type)
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("fighterEquipmentTwo", value.name)
        }
      />
      <ItemSelectField
        name="fighterEquipmentThree"
        filter={(option: Item) =>
          itemChoicesThree.includes(option.name) ||
          itemChoicesThree.includes(option.type)
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("fighterEquipmentThree", value.name)
        }
      />
      <ItemSelectField
        name="fighterEquipmentFour"
        filter={(option: Item) => itemChoicesFour.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("fighterEquipmentFour", value.name)
        }
      />
      <ItemSelectField
        name="fighterEquipmentFive"
        filter={(option: Item) => itemChoicesFive.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("fighterEquipmentFive", value.name)
        }
      />

      <FightingStyleSelectField
        name="fighterFightingStyle"
        filter={() => true}
        label="Select Fighting Style."
        onChange={(value: FightingStyle) =>
          setFieldValue("fighterFightingStyle", value)
        }
        noDivider={true}
      />
    </div>
  );
};

export default FighterForm;
