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
  | 'Tiefling';

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

const raceFormComponents: Record<RaceName, React.FC<object>> = {
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

const subraceFormComponents: Record<SubraceName, React.FC<object>> = {
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
  const [race, setRace] = useState<Race | null>(null);
  const [subrace, setSubrace] = useState<Subrace | null>(null);
  const { getRaceById } = useRaces();
  const { getSubraceById } = useSubraces();

  // Fetch race and subrace data when component mounts or when values change
  useEffect(() => {
    const fetchRaceAndSubrace = async () => {
      try {
        const raceData = await getRaceById({ id: values.raceId });
        if (raceData) setRace(raceData);
      } catch (error) {
        console.error('Error fetching race data:', error);
      }

      if (values.subraceId) {
        try {
          const subraceData = await getSubraceById({ id: values.subraceId });
          if (subraceData) setSubrace(subraceData);
        } catch (error) {
          console.error('Error fetching subrace data:', error);
        }
      }
    };

    fetchRaceAndSubrace();
  }, [values.raceId, values.subraceId, getRaceById, getSubraceById]);

  const RaceFormComponent = race
    ? raceFormComponents[race.name as RaceName]
    : null;
  const SubraceFormComponent = subrace
    ? subraceFormComponents[subrace.name as SubraceName]
    : null;

  return (
    <div className="flex flex-col gap-y-5">
      {RaceFormComponent && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-yellow-500 mb-4">
            Race Details
          </h3>
          <RaceFormComponent />
        </div>
      )}
      {SubraceFormComponent && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-yellow-500 mb-4">
            Subrace Details
          </h3>
          <SubraceFormComponent />
        </div>
      )}
    </div>
  );
};

export default StepTwo;
