import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { NewCharacter, Spell, Item, SkillCheck } from "../../types/DBTypes";
import SkillCheckSelectField from "../../components/inputs/SkillCheckSelectField";
import ItemSelectField from "../../components/inputs/ItemSelectField";
import SpellSelectField from "../../components/inputs/SpellSelectField";
import useClasses from "../../hooks/useClasses";

const wizardSkillChoices = [
  "Arcana",
  "History",
  "Insight",
  "Investigation",
  "Medicine",
  "Religion",
];

const WizardForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { getAllSpellsFromClass } = useClasses();

  const itemChoicesOne = ["Quarterstaff", "Dagger"];
  const itemChoicesTwo = ["Component Pouch", "Arcane Focus"];
  const itemChoicesThree = ["Explorer's Pack", "Scholar's Pack"];

  useEffect(() => {
    const fetchSpellsByClass = async () => {
      try {
        const spellsData = await getAllSpellsFromClass({ className: "Wizard" });
        if (spellsData) {
          const cantrips = spellsData.filter((spell) => spell.spellLevel === 0);
          const levelOneSpells = spellsData.filter(
            (spell) => spell.spellLevel === 1
          );

          if (cantrips.length > 2) {
            if (!values.wizardCantripIdOne)
              setFieldValue("wizardCantripIdOne", cantrips[0].id);
            if (!values.wizardCantripIdTwo)
              setFieldValue("wizardCantripIdTwo", cantrips[1].id);
            if (!values.wizardCantripIdThree)
              setFieldValue("wizardCantripIdThree", cantrips[2].id);
          }

          if (levelOneSpells.length > 5) {
            if (!values.wizardSpellIdOne)
              setFieldValue("wizardSpellIdOne", levelOneSpells[0].id);
            if (!values.wizardSpellIdTwo)
              setFieldValue("wizardSpellIdTwo", levelOneSpells[1].id);
            if (!values.wizardSpellIdThree)
              setFieldValue("wizardSpellIdThree", levelOneSpells[2].id);
            if (!values.wizardSpellIdFour)
              setFieldValue("wizardSpellIdFour", levelOneSpells[3].id);
            if (!values.wizardSpellIdFive)
              setFieldValue("wizardSpellIdFive", levelOneSpells[4].id);
            if (!values.wizardSpellIdSix)
              setFieldValue("wizardSpellIdSix", levelOneSpells[5].id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpellsByClass();

    if (!values.wizardSkillProficiencyOne)
      setFieldValue("wizardSkillProficiencyOne", wizardSkillChoices[0]);
    if (!values.wizardSkillProficiencyTwo)
      setFieldValue("wizardSkillProficiencyTwo", wizardSkillChoices[1]);
    if (!values.wizardEquipmentOne)
      setFieldValue("wizardEquipmentOne", itemChoicesOne[0]);
    if (!values.wizardEquipmentTwo)
      setFieldValue("wizardEquipmentTwo", itemChoicesTwo[0]);
    if (!values.wizardEquipmentThree)
      setFieldValue("wizardEquipmentThree", itemChoicesThree[0]);
  }, []);

  return (
    <div>
      <h2 className="border p-2">WIZARD</h2>

      <SkillCheckSelectField
        name="wizardSkillProficiencyOne"
        filter={(option: SkillCheck) =>
          option !== values.wizardSkillProficiencyTwo &&
          wizardSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillCheck) =>
          setFieldValue("wizardSkillProficiencyOne", value)
        }
      />
      <SkillCheckSelectField
        name="wizardSkillProficiencyTwo"
        filter={(option: SkillCheck) =>
          option !== values.wizardSkillProficiencyOne &&
          wizardSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillCheck) =>
          setFieldValue("wizardSkillProficiencyTwo", value)
        }
      />

      <ItemSelectField
        name="wizardEquipmentOne"
        filter={(option: Item) => itemChoicesOne.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("wizardEquipmentOne", value.name)
        }
      />
      <ItemSelectField
        name="wizardEquipmentTwo"
        filter={(option: Item) => itemChoicesTwo.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("wizardEquipmentTwo", value.name)
        }
      />
      <ItemSelectField
        name="wizardEquipmentThree"
        filter={(option: Item) => itemChoicesThree.includes(option.name)}
        label="Select equipment."
        onChange={(value: Item) =>
          setFieldValue("wizardEquipmentThree", value.name)
        }
      />

      <SpellSelectField
        name="wizardCantripIdOne"
        spellClass="Wizard"
        filter={(option: Spell) =>
          option.spellLevel === 0 &&
          option.id !== values.wizardCantripIdTwo &&
          option.id !== values.wizardCantripIdThree
        }
        label="Select 1 of the following wizard cantrips."
        onChange={(value: Spell) =>
          setFieldValue("wizardCantripIdOne", value.id)
        }
      />
      <SpellSelectField
        name="wizardCantripIdTwo"
        spellClass="Wizard"
        filter={(option: Spell) =>
          option.spellLevel === 0 &&
          option.id !== values.wizardCantripIdOne &&
          option.id !== values.wizardCantripIdThree
        }
        label="Select 1 of the following wizard cantrips."
        onChange={(value: Spell) =>
          setFieldValue("wizardCantripIdTwo", value.id)
        }
      />
      <SpellSelectField
        name="wizardCantripIdThree"
        spellClass="Wizard"
        filter={(option: Spell) =>
          option.spellLevel === 0 &&
          option.id !== values.wizardCantripIdOne &&
          option.id !== values.wizardCantripIdTwo
        }
        label="Select 1 of the following wizard cantrips."
        onChange={(value: Spell) =>
          setFieldValue("wizardCantripIdThree", value.id)
        }
      />

      <SpellSelectField
        name="wizardSpellIdOne"
        spellClass="Wizard"
        filter={(option: Spell) =>
          option.spellLevel === 1 &&
          option.id !== values.wizardSpellIdTwo &&
          option.id !== values.wizardSpellIdThree &&
          option.id !== values.wizardSpellIdFour &&
          option.id !== values.wizardSpellIdFive &&
          option.id !== values.wizardSpellIdSix
        }
        label="Select 1 of the following wizard spells."
        onChange={(value: Spell) => setFieldValue("wizardSpellIdOne", value.id)}
      />
      <SpellSelectField
        name="wizardSpellIdTwo"
        spellClass="Wizard"
        filter={(option: Spell) =>
          option.spellLevel === 1 &&
          option.id !== values.wizardSpellIdOne &&
          option.id !== values.wizardSpellIdThree &&
          option.id !== values.wizardSpellIdFour &&
          option.id !== values.wizardSpellIdFive &&
          option.id !== values.wizardSpellIdSix
        }
        label="Select 1 of the following wizard spells."
        onChange={(value: Spell) => setFieldValue("wizardSpellIdTwo", value.id)}
      />
      <SpellSelectField
        name="wizardSpellIdThree"
        spellClass="Wizard"
        filter={(option: Spell) =>
          option.spellLevel === 1 &&
          option.id !== values.wizardSpellIdOne &&
          option.id !== values.wizardSpellIdTwo &&
          option.id !== values.wizardSpellIdFour &&
          option.id !== values.wizardSpellIdFive &&
          option.id !== values.wizardSpellIdSix
        }
        label="Select 1 of the following wizard spells."
        onChange={(value: Spell) =>
          setFieldValue("wizardSpellIdThree", value.id)
        }
      />
      <SpellSelectField
        name="wizardSpellIdFour"
        spellClass="Wizard"
        filter={(option: Spell) =>
          option.spellLevel === 1 &&
          option.id !== values.wizardSpellIdOne &&
          option.id !== values.wizardSpellIdTwo &&
          option.id !== values.wizardSpellIdThree &&
          option.id !== values.wizardSpellIdFive &&
          option.id !== values.wizardSpellIdSix
        }
        label="Select 1 of the following wizard spells."
        onChange={(value: Spell) =>
          setFieldValue("wizardSpellIdFour", value.id)
        }
      />
      <SpellSelectField
        name="wizardSpellIdFive"
        spellClass="Wizard"
        filter={(option: Spell) =>
          option.spellLevel === 1 &&
          option.id !== values.wizardSpellIdOne &&
          option.id !== values.wizardSpellIdTwo &&
          option.id !== values.wizardSpellIdThree &&
          option.id !== values.wizardSpellIdFour &&
          option.id !== values.wizardSpellIdSix
        }
        label="Select 1 of the following wizard spells."
        onChange={(value: Spell) =>
          setFieldValue("wizardSpellIdFive", value.id)
        }
      />
      <SpellSelectField
        name="wizardSpellIdSix"
        spellClass="Wizard"
        filter={(option: Spell) =>
          option.spellLevel === 1 &&
          option.id !== values.wizardSpellIdOne &&
          option.id !== values.wizardSpellIdTwo &&
          option.id !== values.wizardSpellIdThree &&
          option.id !== values.wizardSpellIdFour &&
          option.id !== values.wizardSpellIdFive
        }
        label="Select 1 of the following wizard spells."
        onChange={(value: Spell) => setFieldValue("wizardSpellIdSix", value.id)}
        noDivider={true}
      />
    </div>
  );
};

export default WizardForm;
