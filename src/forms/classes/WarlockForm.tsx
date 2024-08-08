import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { NewCharacter, Spell, Item, SkillCheck } from "../../types/DBTypes";
import SkillCheckSelectField from "../../components/inputs/SkillCheckSelectField";
import ItemSelectField from "../../components/inputs/ItemSelectField";
import SpellSelectField from "../../components/inputs/SpellSelectField";
import useClasses from "../../hooks/useClasses";

const warlockSkillChoices = [
  "Arcana",
  "Deception",
  "History",
  "Intimidation",
  "Investigation",
  "Nature",
  "Religion",
];

const WarlockForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { getAllSpellsFromClass } = useClasses();

  const itemChoicesOne = ["Crossbow, Light", "Simple Weapon"];
  const itemChoicesTwo = ["Component Pouch", "Arcane Focus"];
  const itemChoicesThree = ["Dungeoneer's Pack", "Scholar's Pack"];

  useEffect(() => {
    const fetchSpellsByClass = async () => {
      try {
        const spellsData = await getAllSpellsFromClass({
          className: "Warlock",
        });
        if (spellsData) {
          const cantrips = spellsData.filter((spell) => spell.spellLevel === 0);
          const levelOneSpells = spellsData.filter(
            (spell) => spell.spellLevel === 1
          );

          if (cantrips.length > 1) {
            if (!values.warlockCantripIdOne)
              if (!values.warlockCantripIdOne)
                setFieldValue("warlockCantripIdOne", cantrips[0].id);
            if (!values.warlockCantripIdTwo)
              setFieldValue("warlockCantripIdTwo", cantrips[1].id);
          }

          if (levelOneSpells.length > 1) {
            if (!values.warlockSpellIdOne)
              setFieldValue("warlockSpellIdOne", levelOneSpells[0].id);
            if (!values.warlockSpellIdTwo)
              setFieldValue("warlockSpellIdTwo", levelOneSpells[1].id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpellsByClass();

    if (!values.warlockSkillProficiencyOne)
      setFieldValue("warlockSkillProficiencyOne", warlockSkillChoices[0]);
    if (!values.warlockSkillProficiencyTwo)
      setFieldValue("warlockSkillProficiencyTwo", warlockSkillChoices[1]);
    if (!values.warlockEquipmentOne)
      setFieldValue("warlockEquipmentOne", itemChoicesOne[0]);
    if (!values.warlockEquipmentTwo)
      setFieldValue("warlockEquipmentTwo", itemChoicesTwo[0]);
    if (!values.warlockEquipmentThree)
      setFieldValue("warlockEquipmentThree", itemChoicesThree[0]);
  }, []);

  return (
    <div>
      <h2 className="border p-2">WARLOCK</h2>

      <SkillCheckSelectField
        name="warlockSkillProficiencyOne"
        filter={(option: SkillCheck) =>
          option !== values.warlockSkillProficiencyTwo &&
          warlockSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillCheck) =>
          setFieldValue("warlockSkillProficiencyOne", value)
        }
      />
      <SkillCheckSelectField
        name="warlockSkillProficiencyTwo"
        filter={(option: SkillCheck) =>
          option !== values.warlockSkillProficiencyOne &&
          warlockSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillCheck) =>
          setFieldValue("warlockSkillProficiencyTwo", value)
        }
      />

      <ItemSelectField
        name="warlockEquipmentOne"
        filter={(option: Item) =>
          itemChoicesOne.includes(option.name) ||
          itemChoicesOne.includes(option.type)
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("warlockEquipmentOne", value.name)
        }
      />
      <ItemSelectField
        name="warlockEquipmentTwo"
        filter={(option: Item) => itemChoicesTwo.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("warlockEquipmentTwo", value.name)
        }
      />
      <ItemSelectField
        name="warlockEquipmentThree"
        filter={(option: Item) => itemChoicesThree.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("warlockEquipmentThree", value.name)
        }
      />

      <SpellSelectField
        name="warlockCantripIdOne"
        spellClass="Warlock"
        filter={(option: Spell) =>
          option.spellLevel === 0 && option.id !== values.warlockCantripIdTwo
        }
        label="Select 1 of the following warlock cantrips."
        onChange={(value: Spell) =>
          setFieldValue("warlockCantripIdOne", value.id)
        }
      />
      <SpellSelectField
        name="warlockCantripIdTwo"
        spellClass="Warlock"
        filter={(option: Spell) =>
          option.spellLevel === 0 && option.id !== values.warlockCantripIdOne
        }
        label="Select 1 of the following warlock cantrips."
        onChange={(value: Spell) =>
          setFieldValue("warlockCantripIdTwo", value.id)
        }
      />

      <SpellSelectField
        name="warlockSpellIdOne"
        spellClass="Warlock"
        filter={(option: Spell) =>
          option.spellLevel === 1 && option.id !== values.warlockSpellIdTwo
        }
        label="Select 1 of the following warlock spells."
        onChange={(value: Spell) =>
          setFieldValue("warlockSpellIdOne", value.id)
        }
      />
      <SpellSelectField
        name="warlockSpellIdTwo"
        spellClass="Warlock"
        filter={(option: Spell) =>
          option.spellLevel === 1 && option.id !== values.warlockSpellIdOne
        }
        label="Select 1 of the following warlock spells."
        onChange={(value: Spell) =>
          setFieldValue("warlockSpellIdTwo", value.id)
        }
        noDivider={true}
      />
    </div>
  );
};

export default WarlockForm;
