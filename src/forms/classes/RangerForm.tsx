import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { NewCharacter, Item, Language } from "../../types/DBTypes";
import SkillCheckSelectField from "../../components/inputs/SkillCheckSelectField";
import ItemSelectField from "../../components/inputs/ItemSelectField";
import LanguageSelectField from "../../components/inputs/LanguageSelectField";
import useLanguages from "../../hooks/useLanguages";

const rangerSkillChoices = [
  "Animal Handling",
  "Athletics",
  "Insight",
  "Investigation",
  "Nature",
  "Perception",
  "Stealth",
  "Survival",
];

const RangerForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { languages } = useLanguages();

  const itemChoicesOne = ["Scale Mail", "Leather Armor"];
  const itemChoicesTwo = ["Shortsword", "Simple Weapon"];
  const itemChoicesThree = ["Dungeoneer's Pack", "Explorer's Pack"];

  useEffect(() => {
    if (!values.rangerSkillProficiencyOne)
      setFieldValue("rangerSkillProficiencyOne", rangerSkillChoices[0]);
    if (!values.rangerSkillProficiencyTwo)
      setFieldValue("rangerSkillProficiencyTwo", rangerSkillChoices[1]);
    if (!values.rangerSkillProficiencyThree)
      setFieldValue("rangerSkillProficiencyThree", rangerSkillChoices[2]);
    if (!values.rangerEquipmentOne)
      setFieldValue("rangerEquipmentOne", itemChoicesOne[0]);
    if (!values.rangerEquipmentTwo)
      setFieldValue("rangerEquipmentTwo", itemChoicesTwo[0]);
    if (!values.rangerEquipmentThree)
      setFieldValue("rangerEquipmentThree", itemChoicesThree[0]);
  }, []);

  useEffect(() => {
    if (languages && !values.rangerBonusLanguageId)
      setFieldValue("rangerBonusLanguageId", languages[0].id);
  }, [languages, values, setFieldValue]);

  return (
    <div>
      <h2 className="border p-2">Ranger</h2>

      <SkillCheckSelectField
        name="rangerSkillProficiencyOne"
        filter={(option: string) =>
          option !== values.rangerSkillProficiencyTwo &&
          option !== values.rangerSkillProficiencyThree &&
          rangerSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: string) =>
          setFieldValue("rangerSkillProficiencyOne", value)
        }
      />
      <SkillCheckSelectField
        name="rangerSkillProficiencyTwo"
        filter={(option: string) =>
          option !== values.rangerSkillProficiencyOne &&
          option !== values.rangerSkillProficiencyThree &&
          rangerSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: string) =>
          setFieldValue("rangerSkillProficiencyTwo", value)
        }
      />
      <SkillCheckSelectField
        name="rangerSkillProficiencyThree"
        filter={(option: string) =>
          option !== values.rangerSkillProficiencyOne &&
          option !== values.rangerSkillProficiencyTwo &&
          rangerSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: string) =>
          setFieldValue("rangerSkillProficiencyThree", value)
        }
      />

      <ItemSelectField
        name="rangerEquipmentOne"
        filter={(option: Item) => itemChoicesOne.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("rangerEquipmentOne", value.name)
        }
      />
      <ItemSelectField
        name="rangerEquipmentTwo"
        filter={(option: Item) =>
          itemChoicesTwo.includes(option.name) ||
          (itemChoicesTwo.includes(option.type) && option.rangeType === "Melee")
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("rangerEquipmentTwo", value.name)
        }
      />
      <ItemSelectField
        name="rangerEquipmentThree"
        filter={(option: Item) => itemChoicesThree.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("rangerEquipmentThree", value.name)
        }
      />

      <LanguageSelectField
        name="rangerBonusLanguageId"
        filter={() => true}
        label="Select a language."
        onChange={(value: Language) =>
          setFieldValue("rangerBonusLanguageId", value.id)
        }
        noDivider={true}
      />
    </div>
  );
};

export default RangerForm;
