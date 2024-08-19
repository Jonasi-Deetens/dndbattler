import hillDwarfMale from '../assets/RacePics/Dwarf - Hill Dwarf/male.webp';
import hillDwarfFemale from '../assets/RacePics/Dwarf - Hill Dwarf/female.webp';
import highElfMale from '../assets/RacePics/Elf - High Elf/male.webp';
import highElfFemale from '../assets/RacePics/Elf - High Elf/female.webp';
import lightfootMale from '../assets/RacePics/Halfling - Lightfoot/male.webp';
import lightfootFemale from '../assets/RacePics/Halfling - Lightfoot/female.webp';
import humanMale from '../assets/RacePics/Human/male.webp';
import humanFemale from '../assets/RacePics/Human/female.webp';
import dragonbornMale from '../assets/RacePics/Dragonborn/male.webp';
import dragonbornFemale from '../assets/RacePics/Dragonborn/female.webp';
import forestGnomeMale from '../assets/RacePics/Gnome - Forest Gnome/male.webp';
import forestGnomeFemale from '../assets/RacePics/Gnome - Forest Gnome/female.webp';
import halfElfMale from '../assets/RacePics/Half Elf/male.webp';
import halfElfFemale from '../assets/RacePics/Half Elf/female.webp';
import halfOrcMale from '../assets/RacePics/Half Orc/male.webp';
import halfOrcFemale from '../assets/RacePics/Half Orc/female.webp';
import tieflingMale from '../assets/RacePics/Tiefling/male.webp';
import tieflingFemale from '../assets/RacePics/Tiefling/female.webp';
import mountainDwarfMale from '../assets/RacePics/Dwarf - Mountain Dwarf/male.webp';
import mountainDwarfFemale from '../assets/RacePics/Dwarf - Mountain Dwarf/female.webp';
import woodElfMale from '../assets/RacePics/Elf - Wood Elf/male.webp';
import woodElfFemale from '../assets/RacePics/Elf - Wood Elf/female.webp';
import darkElfMale from '../assets/RacePics/Elf - Drow/male.webp';
import darkElfFemale from '../assets/RacePics/Elf - Drow/female.webp';
import stoutMale from '../assets/RacePics/Halfling - Stout/male.webp';
import stoutFemale from '../assets/RacePics/Halfling - Stout/female.webp';
import rockGnomeMale from '../assets/RacePics/Gnome - Rock Gnome/male.webp';
import rockGnomeFemale from '../assets/RacePics/Gnome - Rock Gnome/female.webp';

type RaceImage = {
  male: string;
  female: string;
};

type RaceImages = {
  [key: number]: RaceImage;
};

const useRaceImages = () => {
  const raceImages: RaceImages = {
    1: {
      male: hillDwarfMale,
      female: hillDwarfFemale
    },
    2: {
      male: highElfMale,
      female: highElfFemale
    },
    3: {
      male: lightfootMale,
      female: lightfootFemale
    },
    4: {
      male: humanMale,
      female: humanFemale
    },
    5: {
      male: dragonbornMale,
      female: dragonbornFemale
    },
    6: {
      male: forestGnomeMale,
      female: forestGnomeFemale
    },
    7: {
      male: halfElfMale,
      female: halfElfFemale
    },
    8: {
      male: halfOrcMale,
      female: halfOrcFemale
    },
    9: {
      male: tieflingMale,
      female: tieflingFemale
    }
  };

  const subraceImages: RaceImages = {
    1: {
      male: hillDwarfMale,
      female: hillDwarfFemale
    },
    2: {
      male: mountainDwarfMale,
      female: mountainDwarfFemale
    },
    3: {
      male: highElfMale,
      female: highElfFemale
    },
    4: {
      male: woodElfMale,
      female: woodElfFemale
    },
    5: {
      male: darkElfMale,
      female: darkElfFemale
    },
    6: {
      male: lightfootMale,
      female: lightfootFemale
    },
    7: {
      male: stoutMale,
      female: stoutFemale
    },
    8: {
      male: forestGnomeMale,
      female: forestGnomeFemale
    },
    9: {
      male: rockGnomeMale,
      female: rockGnomeFemale
    }
  };

  return { raceImages, subraceImages };
};

export default useRaceImages;
