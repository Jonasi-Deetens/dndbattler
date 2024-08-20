import barbarian from '../assets/ClassEmblems/barbarian.webp';
import bard from '../assets/ClassEmblems/bard.webp';
import cleric from '../assets/ClassEmblems/cleric.webp';
import druid from '../assets/ClassEmblems/druid.webp';
import fighter from '../assets/ClassEmblems/fighter.webp';
import monk from '../assets/ClassEmblems/monk.webp';
import paladin from '../assets/ClassEmblems/paladin.webp';
import ranger from '../assets/ClassEmblems/ranger.webp';
import rogue from '../assets/ClassEmblems/rogue.webp';
import sorcerer from '../assets/ClassEmblems/sorcerer.webp';
import warlock from '../assets/ClassEmblems/warlock.webp';
import wizard from '../assets/ClassEmblems/wizard.webp';

type ClassImages = {
  [key: number]: string;
};

const useClassImages = () => {
  const classImages: ClassImages = {
    1: barbarian,
    2: bard,
    3: cleric,
    4: druid,
    5: fighter,
    6: monk,
    7: paladin,
    8: ranger,
    9: rogue,
    10: sorcerer,
    11: warlock,
    12: wizard
  };

  return { classImages };
};

export default useClassImages;
