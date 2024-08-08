import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { NewCharacter, Spell, Item, SkillCheck } from "../../types/DBTypes";
import useClasses from "../../hooks/useClasses";
import SkillCheckSelectField from "../../components/inputs/SkillCheckSelectField";
import ItemSelectField from "../../components/inputs/ItemSelectField";
import SpellSelectField from "../../components/inputs/SpellSelectField";

const clericSkillChoices = [
  "History",
  "Insight",
  "Medicine",
  "Persuasion",
  "Religion",
];

const ClericForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { getAllSpellsFromClass } = useClasses();

  const itemChoicesOne = ["Mace", "Warhammer"];
  const itemChoicesTwo = ["Scale Mail", "Leather Armor", "Chain Mail"];
  const itemChoicesThree = ["Crossbow, Light", "Simple Weapon"];
  const itemChoicesFour = ["Priest's Pack", "Explorer's Pack"];

  useEffect(() => {
    const fetchSpellsByClass = async () => {
      try {
        const spellsData = await getAllSpellsFromClass({ className: "Cleric" });
        if (spellsData) {
          const cantrips = spellsData.filter((spell) => spell.spellLevel === 0);

          if (cantrips.length > 2) {
            if (!values.clericCantripIdOne)
              setFieldValue("clericCantripIdOne", cantrips[0].id);
            if (!values.clericCantripIdTwo)
              setFieldValue("clericCantripIdTwo", cantrips[1].id);
            if (!values.clericCantripIdThree)
              setFieldValue("clericCantripIdThree", cantrips[2].id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpellsByClass();

    if (!values.clericSkillProficiencyOne)
      setFieldValue("clericSkillProficiencyOne", clericSkillChoices[0]);
    if (!values.clericSkillProficiencyTwo)
      setFieldValue("clericSkillProficiencyTwo", clericSkillChoices[1]);
    if (!values.clericEquipmentOne)
      setFieldValue("clericEquipmentOne", itemChoicesOne[0]);
    if (!values.clericEquipmentTwo)
      setFieldValue("clericEquipmentTwo", itemChoicesTwo[0]);
    if (!values.clericEquipmentThree)
      setFieldValue("clericEquipmentThree", itemChoicesThree[0]);
    if (!values.clericEquipmentFour)
      setFieldValue("clericEquipmentFour", itemChoicesFour[0]);
  }, []);

  return (
    <div>
      <h2 className="border p-2">CLERIC</h2>

      <SkillCheckSelectField
        name="clericSkillProficiencyOne"
        filter={(option: SkillCheck) =>
          option !== values.clericSkillProficiencyTwo &&
          clericSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillCheck) =>
          setFieldValue("clericSkillProficiencyOne", value)
        }
      />
      <SkillCheckSelectField
        name="clericSkillProficiencyTwo"
        filter={(option: SkillCheck) =>
          option !== values.clericSkillProficiencyOne &&
          clericSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillCheck) =>
          setFieldValue("clericSkillProficiencyTwo", value)
        }
      />
      <ItemSelectField
        name="clericEquipmentOne"
        filter={(option: Item) => itemChoicesOne.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("clericEquipmentOne", value.name)
        }
      />
      <ItemSelectField
        name="clericEquipmentTwo"
        filter={(option: Item) => itemChoicesTwo.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("clericEquipmentTwo", value.name)
        }
      />
      <ItemSelectField
        name="clericEquipmentThree"
        filter={(option: Item) =>
          itemChoicesThree.includes(option.name) ||
          itemChoicesThree.includes(option.type)
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("clericEquipmentThree", value.name)
        }
      />
      <ItemSelectField
        name="clericEquipmentFour"
        filter={(option: Item) => itemChoicesFour.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("clericEquipmentFour", value.name)
        }
      />
      <SpellSelectField
        name="clericCantripIdOne"
        spellClass="Cleric"
        filter={(option: Spell) =>
          option.spellLevel === 0 &&
          option.id !== values.clericCantripIdTwo &&
          option.id !== values.clericCantripIdThree
        }
        label="Select 1 of the following cleric cantrips."
        onChange={(value: Spell) =>
          setFieldValue("clericCantripIdOne", value.id)
        }
      />
      <SpellSelectField
        name="clericCantripIdTwo"
        spellClass="Cleric"
        filter={(option: Spell) =>
          option.spellLevel === 0 &&
          option.id !== values.clericCantripIdOne &&
          option.id !== values.clericCantripIdThree
        }
        label="Select 1 of the following cleric cantrips."
        onChange={(value: Spell) =>
          setFieldValue("clericCantripIdTwo", value.id)
        }
      />
      <SpellSelectField
        name="clericCantripIdThree"
        spellClass="Cleric"
        filter={(option: Spell) =>
          option.spellLevel === 0 &&
          option.id !== values.clericCantripIdOne &&
          option.id !== values.clericCantripIdTwo
        }
        label="Select 1 of the following cleric cantrips."
        onChange={(value: Spell) =>
          setFieldValue("clericCantripIdThree", value.id)
        }
        noDivider={true}
      />
    </div>
  );
};

export default ClericForm;
