import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { NewCharacter, Spell, Item } from "../../types/DBTypes";
import SkillCheckSelectField from "../../components/inputs/SkillCheckSelectField";
import ItemSelectField from "../../components/inputs/ItemSelectField";
import SpellSelectField from "../../components/inputs/SpellSelectField";
import useClasses from "../../hooks/useClasses";

const sorcererSkillChoices = [
  "Arcana",
  "Deception",
  "Insight",
  "Intimidation",
  "Persuasion",
  "Religion",
];

const SorcererForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { getAllSpellsFromClass } = useClasses();

  const itemChoicesOne = ["Crossbow, Light", "Simple Weapon"];
  const itemChoicesTwo = ["Component Pouch", "Arcane Focus"];
  const itemChoicesThree = ["Dungeoneer's Pack", "Explorer's Pack"];

  useEffect(() => {
    const fetchSpellsByClass = async () => {
      try {
        const spellsData = await getAllSpellsFromClass({
          className: "Sorcerer",
        });
        if (spellsData) {
          const cantrips = spellsData.filter((spell) => spell.spellLevel === 0);
          const levelOneSpells = spellsData.filter(
            (spell) => spell.spellLevel === 1
          );

          if (cantrips.length > 3) {
            if (!values.sorcererCantripIdOne)
              setFieldValue("sorcererCantripIdOne", cantrips[0].id);
            if (!values.sorcererCantripIdTwo)
              setFieldValue("sorcererCantripIdTwo", cantrips[1].id);
            if (!values.sorcererCantripIdThree)
              setFieldValue("sorcererCantripIdThree", cantrips[2].id);
            if (!values.sorcererCantripIdFour)
              setFieldValue("sorcererCantripIdFour", cantrips[3].id);
          }

          if (levelOneSpells.length > 1) {
            if (!values.sorcererSpellIdOne)
              setFieldValue("sorcererSpellIdOne", levelOneSpells[0].id);
            if (!values.sorcererSpellIdTwo)
              setFieldValue("sorcererSpellIdTwo", levelOneSpells[1].id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpellsByClass();

    if (!values.sorcererSkillProficiencyOne)
      setFieldValue("sorcererSkillProficiencyOne", sorcererSkillChoices[0]);
    if (!values.sorcererSkillProficiencyTwo)
      setFieldValue("sorcererSkillProficiencyTwo", sorcererSkillChoices[1]);
    if (!values.sorcererEquipmentOne)
      setFieldValue("sorcererEquipmentOne", itemChoicesOne[0]);
    if (!values.sorcererEquipmentTwo)
      setFieldValue("sorcererEquipmentTwo", itemChoicesTwo[0]);
    if (!values.sorcererEquipmentThree)
      setFieldValue("sorcererEquipmentThree", itemChoicesThree[0]);
  }, []);

  return (
    <div>
      <h2 className="border p-2">SORCERER</h2>

      <SkillCheckSelectField
        name="sorcererSkillProficiencyOne"
        filter={(option: string) =>
          option !== values.sorcererSkillProficiencyTwo &&
          sorcererSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: string) =>
          setFieldValue("sorcererSkillProficiencyOne", value)
        }
      />
      <SkillCheckSelectField
        name="sorcererSkillProficiencyTwo"
        filter={(option: string) =>
          option !== values.sorcererSkillProficiencyOne &&
          sorcererSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: string) =>
          setFieldValue("sorcererSkillProficiencyTwo", value)
        }
      />

      <ItemSelectField
        name="sorcererEquipmentOne"
        filter={(option: Item) =>
          itemChoicesOne.includes(option.name) ||
          itemChoicesOne.includes(option.type)
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("sorcererEquipmentOne", value.name)
        }
      />
      <ItemSelectField
        name="sorcererEquipmentTwo"
        filter={(option: Item) => itemChoicesTwo.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("sorcererEquipmentTwo", value.name)
        }
      />
      <ItemSelectField
        name="sorcererEquipmentThree"
        filter={(option: Item) => itemChoicesThree.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("sorcererEquipmentThree", value.name)
        }
      />

      <SpellSelectField
        name="sorcererCantripIdOne"
        spellClass="Sorcerer"
        filter={(option: Spell) =>
          option.spellLevel === 0 &&
          option.id !== values.sorcererCantripIdTwo &&
          option.id !== values.sorcererCantripIdThree &&
          option.id !== values.sorcererCantripIdFour
        }
        label="Select 1 of the following sorcerer cantrips."
        onChange={(value: Spell) =>
          setFieldValue("sorcererCantripIdOne", value.id)
        }
      />
      <SpellSelectField
        name="sorcererCantripIdTwo"
        spellClass="Sorcerer"
        filter={(option: Spell) =>
          option.spellLevel === 0 &&
          option.id !== values.sorcererCantripIdOne &&
          option.id !== values.sorcererCantripIdThree &&
          option.id !== values.sorcererCantripIdFour
        }
        label="Select 1 of the following sorcerer cantrips."
        onChange={(value: Spell) =>
          setFieldValue("sorcererCantripIdTwo", value.id)
        }
      />
      <SpellSelectField
        name="sorcererCantripIdThree"
        spellClass="Sorcerer"
        filter={(option: Spell) =>
          option.spellLevel === 0 &&
          option.id !== values.sorcererCantripIdOne &&
          option.id !== values.sorcererCantripIdTwo &&
          option.id !== values.sorcererCantripIdFour
        }
        label="Select 1 of the following sorcerer cantrips."
        onChange={(value: Spell) =>
          setFieldValue("sorcererCantripIdThree", value.id)
        }
      />
      <SpellSelectField
        name="sorcererCantripIdFour"
        spellClass="Sorcerer"
        filter={(option: Spell) =>
          option.spellLevel === 0 &&
          option.id !== values.sorcererCantripIdOne &&
          option.id !== values.sorcererCantripIdTwo &&
          option.id !== values.sorcererCantripIdThree
        }
        label="Select 1 of the following sorcerer cantrips."
        onChange={(value: Spell) =>
          setFieldValue("sorcererCantripIdFour", value.id)
        }
      />

      <SpellSelectField
        name="sorcererSpellIdOne"
        spellClass="Sorcerer"
        filter={(option: Spell) =>
          option.spellLevel === 1 && option.id !== values.sorcererSpellIdTwo
        }
        label="Select 1 of the following sorcerer spells."
        onChange={(value: Spell) =>
          setFieldValue("sorcererSpellIdOne", value.id)
        }
      />
      <SpellSelectField
        name="sorcererSpellIdTwo"
        spellClass="Sorcerer"
        filter={(option: Spell) =>
          option.spellLevel === 1 && option.id !== values.sorcererSpellIdOne
        }
        label="Select 1 of the following sorcerer spells."
        onChange={(value: Spell) =>
          setFieldValue("sorcererSpellIdTwo", value.id)
        }
        noDivider={true}
      />
    </div>
  );
};

export default SorcererForm;
