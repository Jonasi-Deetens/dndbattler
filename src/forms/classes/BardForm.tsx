import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { NewCharacter, SkillChecks, Spell, Item } from "../../types/DBTypes";
import useClasses from "../../hooks/useClasses";
import SkillCheckSelectField from "../../components/inputs/SkillCheckSelectField";
import ItemSelectField from "../../components/inputs/ItemSelectField";
import SpellSelectField from "../../components/inputs/SpellSelectField";

const skillChecks = Object.values(SkillChecks);

const BardForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { getAllSpellsFromClass } = useClasses();

  const itemChoicesOne = ["Rapier", "Longsword", "Simple Weapon"];
  const itemChoicesTwo = ["Diplomat's Pack", "Entertainer's Pack"];
  const itemChoicesThree = ["Musical Instrument"];

  useEffect(() => {
    const fetchSpellsByClass = async () => {
      try {
        const spellsData = await getAllSpellsFromClass({ className: "Bard" });
        if (spellsData) {
          const cantrips = spellsData.filter((spell) => spell.spellLevel === 0);
          const levelOneSpells = spellsData.filter(
            (spell) => spell.spellLevel === 1
          );

          if (cantrips.length > 1) {
            if (!values.bardBonusCantripIdOne)
              setFieldValue("bardBonusCantripIdOne", cantrips[0].id);
            if (!values.bardBonusCantripIdTwo)
              setFieldValue("bardBonusCantripIdTwo", cantrips[1].id);
          }

          if (levelOneSpells.length > 3) {
            if (!values.bardBonusSpellIdOne)
              setFieldValue("bardBonusSpellIdOne", levelOneSpells[0].id);
            if (!values.bardBonusSpellIdTwo)
              setFieldValue("bardBonusSpellIdTwo", levelOneSpells[1].id);
            if (!values.bardBonusSpellIdThree)
              setFieldValue("bardBonusSpellIdThree", levelOneSpells[2].id);
            if (!values.bardBonusSpellIdFour)
              setFieldValue("bardBonusSpellIdFour", levelOneSpells[3].id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpellsByClass();

    if (!values.bardBonusSkillProficiencyOne)
      setFieldValue("bardBonusSkillProficiencyOne", skillChecks[0]);
    if (!values.bardBonusSkillProficiencyTwo)
      setFieldValue("bardBonusSkillProficiencyTwo", skillChecks[1]);
    if (!values.bardBonusSkillProficiencyThree)
      setFieldValue("bardBonusSkillProficiencyThree", skillChecks[2]);

    if (!values.bardBonusMusicalProficiencyOne)
      setFieldValue("bardBonusMusicalProficiencyOne", "Bagpipes");
    if (!values.bardBonusMusicalProficiencyTwo)
      setFieldValue("bardBonusMusicalProficiencyTwo", "Dulcimer");
    if (!values.bardBonusMusicalProficiencyThree)
      setFieldValue("bardBonusMusicalProficiencyThree", "Drum");
    if (!values.bardEquipmentOne)
      setFieldValue("bardEquipmentOne", itemChoicesOne[0]);
    if (!values.bardEquipmentTwo)
      setFieldValue("bardEquipmentTwo", itemChoicesTwo[0]);
    if (!values.bardEquipmentThree)
      setFieldValue("bardEquipmentThree", itemChoicesThree[0]);
  }, []);

  return (
    <div>
      <h2 className="border p-2">BARD</h2>

      <SkillCheckSelectField
        name="bardBonusSkillProficiencyOne"
        filter={(option: SkillChecks) =>
          option !== values.bardBonusSkillProficiencyTwo &&
          option !== values.bardBonusSkillProficiencyThree
        }
        label="Select skill proficiency."
        onChange={(value: SkillChecks) =>
          setFieldValue("bardBonusSkillProficiencyOne", value)
        }
      />
      <SkillCheckSelectField
        name="bardBonusSkillProficiencyTwo"
        filter={(option: SkillChecks) =>
          option !== values.bardBonusSkillProficiencyOne &&
          option !== values.bardBonusSkillProficiencyThree
        }
        label="Select skill proficiency."
        onChange={(value: SkillChecks) =>
          setFieldValue("bardBonusSkillProficiencyTwo", value)
        }
      />
      <SkillCheckSelectField
        name="bardBonusSkillProficiencyThree"
        filter={(option: SkillChecks) =>
          option !== values.bardBonusSkillProficiencyTwo &&
          option !== values.bardBonusSkillProficiencyOne
        }
        label="Select skill proficiency."
        onChange={(value: SkillChecks) =>
          setFieldValue("bardBonusSkillProficiencyThree", value)
        }
      />

      <ItemSelectField
        name="bardEquipmentOne"
        filter={(option: Item) =>
          option.name !== values.bardEquipmentTwo &&
          option.name !== values.bardEquipmentThree &&
          (itemChoicesOne.includes(option.name) ||
            itemChoicesOne.includes(option.type))
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("bardEquipmentOne", value.name)
        }
      />
      <ItemSelectField
        name="bardEquipmentTwo"
        filter={(option: Item) =>
          option.name !== values.bardEquipmentOne &&
          option.name !== values.bardEquipmentThree &&
          (itemChoicesTwo.includes(option.name) ||
            itemChoicesTwo.includes(option.type))
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("bardEquipmentTwo", value.name)
        }
      />
      <ItemSelectField
        name="bardEquipmentThree"
        filter={(option: Item) =>
          option.name !== values.bardEquipmentOne &&
          option.name !== values.bardEquipmentTwo &&
          (itemChoicesThree.includes(option.name) ||
            itemChoicesThree.includes(option.type))
        }
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("bardEquipmentThree", value.name)
        }
      />

      <ItemSelectField
        name="bardBonusMusicalProficiencyOne"
        filter={(option: Item) =>
          option.name !== values.bardBonusMusicalProficiencyTwo &&
          option.name !== values.bardBonusMusicalProficiencyThree &&
          (itemChoicesThree.includes(option.name) ||
            itemChoicesThree.includes(option.type))
        }
        label="Select musical proficiency."
        onChange={(value: Item) =>
          setFieldValue("bardBonusMusicalProficiencyOne", value.name)
        }
      />
      <ItemSelectField
        name="bardBonusMusicalProficiencyTwo"
        filter={(option: Item) =>
          option.name !== values.bardBonusMusicalProficiencyOne &&
          option.name !== values.bardBonusMusicalProficiencyThree &&
          (itemChoicesThree.includes(option.name) ||
            itemChoicesThree.includes(option.type))
        }
        label="Select musical proficiency."
        onChange={(value: Item) =>
          setFieldValue("bardBonusMusicalProficiencyTwo", value.name)
        }
      />
      <ItemSelectField
        name="bardBonusMusicalProficiencyThree"
        filter={(option: Item) =>
          option.name !== values.bardBonusMusicalProficiencyOne &&
          option.name !== values.bardBonusMusicalProficiencyTwo &&
          (itemChoicesThree.includes(option.name) ||
            itemChoicesThree.includes(option.type))
        }
        label="Select musical proficiency."
        onChange={(value: Item) =>
          setFieldValue("bardBonusMusicalProficiencyThree", value.name)
        }
      />

      <SpellSelectField
        name="bardBonusCantripIdOne"
        spellClass="Bard"
        filter={(option: Spell) =>
          option.spellLevel === 0 && option.id !== values.bardBonusCantripIdTwo
        }
        label="Select 1 of the following bard cantrips."
        onChange={(value: Spell) =>
          setFieldValue("bardBonusCantripIdOne", value.id)
        }
      />
      <SpellSelectField
        name="bardBonusCantripIdTwo"
        spellClass="Bard"
        filter={(option: Spell) =>
          option.spellLevel === 0 && option.id !== values.bardBonusCantripIdOne
        }
        label="Select 1 of the following bard cantrips."
        onChange={(value: Spell) =>
          setFieldValue("bardBonusCantripIdTwo", value.id)
        }
      />

      <SpellSelectField
        name="bardBonusSpellIdOne"
        spellClass="Bard"
        filter={(option: Spell) =>
          option.spellLevel === 1 &&
          option.id !== values.bardBonusSpellIdTwo &&
          option.id !== values.bardBonusSpellIdThree &&
          option.id !== values.bardBonusSpellIdFour
        }
        label="Select 1 of the following bard spells."
        onChange={(value: Spell) =>
          setFieldValue("bardBonusSpellIdOne", value.id)
        }
      />
      <SpellSelectField
        name="bardBonusSpellIdTwo"
        spellClass="Bard"
        filter={(option: Spell) =>
          option.spellLevel === 1 &&
          option.id !== values.bardBonusSpellIdOne &&
          option.id !== values.bardBonusSpellIdThree &&
          option.id !== values.bardBonusSpellIdFour
        }
        label="Select 1 of the following bard spells."
        onChange={(value: Spell) =>
          setFieldValue("bardBonusSpellIdTwo", value.id)
        }
      />
      <SpellSelectField
        name="bardBonusSpellIdThree"
        spellClass="Bard"
        filter={(option: Spell) =>
          option.spellLevel === 1 &&
          option.id !== values.bardBonusSpellIdOne &&
          option.id !== values.bardBonusSpellIdTwo &&
          option.id !== values.bardBonusSpellIdFour
        }
        label="Select 1 of the following bard spells."
        onChange={(value: Spell) =>
          setFieldValue("bardBonusSpellIdThree", value.id)
        }
      />
      <SpellSelectField
        name="bardBonusSpellIdFour"
        spellClass="Bard"
        filter={(option: Spell) =>
          option.spellLevel === 1 &&
          option.id !== values.bardBonusSpellIdOne &&
          option.id !== values.bardBonusSpellIdTwo &&
          option.id !== values.bardBonusSpellIdThree
        }
        label="Select 1 of the following bard spells."
        onChange={(value: Spell) =>
          setFieldValue("bardBonusSpellIdFour", value.id)
        }
        noDivider={true}
      />
    </div>
  );
};

export default BardForm;
