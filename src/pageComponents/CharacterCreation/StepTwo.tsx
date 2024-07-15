import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import useRaces from '../../hooks/useRaces';
import useSubraces from '../../hooks/useSubraces';
import { Character, Race, Subrace } from '../../types/DBTypes';
import {
  DwarfForm,
  ElfForm,
  HalflingForm,
  HumanForm,
  DragonbornForm,
  GnomeForm,
  HalfElfForm,
  HalfOrcForm,
  TieflingForm
} from '../../forms/races';
import {
  DarkElfForm,
  ForestGnomeForm,
  HighElfForm,
  HillDwarfForm,
  LightfootForm,
  MountainDwarfForm,
  RockGnomeForm,
  StoutForm,
  WoodElfForm
} from '../../forms/subraces';

type RaceName =
  | 'Dwarf'
  | 'Elf'
  | 'Halfling'
  | 'Human'
  | 'Dragonborn'
  | 'Gnome'
  | 'Half Elf'
  | 'Half Orc'
  | 'Tiefling'
  | 'Human';

type RaceFormComponents = {
  [key in RaceName as string]: React.FC<object>;
};
const raceFormComponents: RaceFormComponents = {
  Dwarf: DwarfForm,
  Elf: ElfForm,
  Halfling: HalflingForm,
  Human: HumanForm,
  Dragonborn: DragonbornForm,
  Gnome: GnomeForm,
  'Half Elf': HalfElfForm,
  'Half Orc': HalfOrcForm,
  Tiefling: TieflingForm
};

type SubraceName =
  | 'Hill Dwarf'
  | 'Mountain Dwarf'
  | 'High Elf'
  | 'Wood Elf'
  | 'Dark Elf'
  | 'Lightfoot'
  | 'Stout'
  | 'Forest Gnome'
  | 'Rock Gnome';

type SubraceFormComponents = {
  [key in SubraceName as string]: React.FC<object>;
};
const subraceFormComponents: SubraceFormComponents = {
  'Hill Dwarf': HillDwarfForm,
  'Mountain Dwarf': MountainDwarfForm,
  'High Elf': HighElfForm,
  'Wood Elf': WoodElfForm,
  'Dark Elf': DarkElfForm,
  Lightfoot: LightfootForm,
  Stout: StoutForm,
  'Forest Gnome': ForestGnomeForm,
  'Rock Gnome': RockGnomeForm
};

const StepTwo: React.FC = () => {
  const { values } = useFormikContext<Character>();
  const [race, setRace] = useState<Race>();
  const [subrace, setSubrace] = useState<Subrace>();
  const { getRaceById } = useRaces();
  const { getSubraceById } = useSubraces();

  useEffect(() => {
    const fetchRaceWithSubrace = async () => {
      try {
        const raceData = await getRaceById({ id: values.raceId });
        if (raceData) setRace(raceData);
      } catch (error) {
        console.error(error);
      }

      if (values.subraceId) {
        try {
          const subraceData = await getSubraceById({ id: values.subraceId });
          if (subraceData) setSubrace(subraceData);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchRaceWithSubrace();
  }, []);

  const RaceFormComponent = race ? raceFormComponents[race.name] : null;
  const SubraceFormComponent = subrace
    ? subraceFormComponents[subrace.name]
    : null;
  return (
    <div>
      {RaceFormComponent && <RaceFormComponent />}
      <hr className="border-dashed border-t-2 w-1/2 m-auto my-5" />
      {SubraceFormComponent && <SubraceFormComponent />}
    </div>
  );
};

export default StepTwo;
