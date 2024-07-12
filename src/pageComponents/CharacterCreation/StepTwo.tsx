import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import useRaces from "../../hooks/useRaces";
import useSubraces from "../../hooks/useSubraces";
import { Character, Race, Subrace } from "../../types/DBTypes";
import DwarfForm from "../../forms/races/DwarfForm";
import HillDwarfForm from "../../forms/subraces/HillDwarfForm";

type RaceName = "Dwarf";

type RaceFormComponents = {
  [key in RaceName as string]: React.FC<object>;
};
const raceFormComponents: RaceFormComponents = {
  Dwarf: DwarfForm,
};

type SubraceName = "Hill Dwarf";

type SubraceFormComponents = {
  [key in SubraceName as string]: React.FC<object>;
};
const subraceFormComponents: SubraceFormComponents = {
  "Hill Dwarf": HillDwarfForm,
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
      {SubraceFormComponent && <SubraceFormComponent />}
    </div>
  );
};

export default StepTwo;
