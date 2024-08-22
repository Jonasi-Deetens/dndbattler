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
import pathOfTheBerserker from '../assets/SubclassEmblems/Barbarian/pathOfTheBerserker.webp';
import pathOfTheTotemWarrior from '../assets/SubclassEmblems/Barbarian/pathOfTheTotemWarrior.webp';
import collegeOfLore from '../assets/SubclassEmblems/Bard/collegeOfLore.webp';
import collegeOfValor from '../assets/SubclassEmblems/Bard/collegeOfValor.webp';
import knowledgeDomain from '../assets/SubclassEmblems/Cleric/knowledgeDomain.webp';
import lifeDomain from '../assets/SubclassEmblems/Cleric/lifeDomain.webp';
import lightDomain from '../assets/SubclassEmblems/Cleric/lightDomain.webp';
import natureDomain from '../assets/SubclassEmblems/Cleric/natureDomain.webp';
import tempestDomain from '../assets/SubclassEmblems/Cleric/tempestDomain.webp';
import trickeryDomain from '../assets/SubclassEmblems/Cleric/trickeryDomain.webp';
import warDomain from '../assets/SubclassEmblems/Cleric/warDomain.webp';
import circleOfTheLand from '../assets/SubclassEmblems/Druid/circleOfTheLand.webp';
import circleOfTheMoon from '../assets/SubclassEmblems/Druid/circleOfTheMoon.webp';
import champion from '../assets/SubclassEmblems/Fighter/champion.webp';
import battleMaster from '../assets/SubclassEmblems/Fighter/battleMaster.webp';
import eldritchKnight from '../assets/SubclassEmblems/Fighter/eldritchKnight.webp';
import wayOfTheOpenHand from '../assets/SubclassEmblems/Monk/wayOfTheOpenHand.webp';
import wayOfTheShadow from '../assets/SubclassEmblems/Monk/wayOfTheShadow.webp';
import oathOfDevotion from '../assets/SubclassEmblems/Paladin/oathOfDevotion.webp';
import oathOfTheAncients from '../assets/SubclassEmblems/Paladin/oathOfTheAncients.webp';
import oathOfVengeance from '../assets/SubclassEmblems/Paladin/oathOfVengeance.webp';
import hunter from '../assets/SubclassEmblems/Ranger/hunter.webp';
import beastMaster from '../assets/SubclassEmblems/Ranger/beastMaster.webp';
import thief from '../assets/SubclassEmblems/Rogue/thief.webp';
import assassin from '../assets/SubclassEmblems/Rogue/assassin.webp';
import arcaneTrickster from '../assets/SubclassEmblems/Rogue/arcaneTrickster.webp';
import draconicBloodline from '../assets/SubclassEmblems/Sorcerer/draconicBloodline.webp';
import wildMagic from '../assets/SubclassEmblems/Sorcerer/wildMagic.webp';
import theArchfey from '../assets/SubclassEmblems/Warlock/theArchfey.webp';
import theFiend from '../assets/SubclassEmblems/Warlock/theFiend.webp';
import theGreatOldOne from '../assets/SubclassEmblems/Warlock/theGreatOldOne.webp';
import schoolOfAbjuration from '../assets/SubclassEmblems/Wizard/schoolOfAbjuration.webp';
import schoolOfConjuration from '../assets/SubclassEmblems/Wizard/schoolOfConjuration.webp';
import schoolOfDivination from '../assets/SubclassEmblems/Wizard/schoolOfDivination.webp';
import schoolOfEnchantment from '../assets/SubclassEmblems/Wizard/schoolOfEnchantment.webp';
import schoolOfEvocation from '../assets/SubclassEmblems/Wizard/schoolOfEvocation.webp';
import schoolOfIllusion from '../assets/SubclassEmblems/Wizard/schoolOfIllusion.webp';
import schoolOfNecromancy from '../assets/SubclassEmblems/Wizard/schoolOfNecromancy.webp';
import schoolOfTransmutation from '../assets/SubclassEmblems/Wizard/schoolOfTransmutation.webp';

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

  const subclassImages: ClassImages = {
    1: pathOfTheBerserker,
    2: pathOfTheTotemWarrior,
    3: collegeOfLore,
    4: collegeOfValor,
    5: knowledgeDomain,
    6: lifeDomain,
    7: lightDomain,
    8: natureDomain,
    9: tempestDomain,
    10: trickeryDomain,
    11: warDomain,
    12: circleOfTheLand,
    13: circleOfTheMoon,
    14: champion,
    15: battleMaster,
    16: eldritchKnight,
    17: wayOfTheOpenHand,
    18: wayOfTheShadow,
    19: oathOfDevotion,
    20: oathOfTheAncients,
    21: oathOfVengeance,
    22: hunter,
    23: beastMaster,
    24: thief,
    25: assassin,
    26: arcaneTrickster,
    27: draconicBloodline,
    28: wildMagic,
    29: theArchfey,
    30: theFiend,
    31: theGreatOldOne,
    32: schoolOfAbjuration,
    33: schoolOfConjuration,
    34: schoolOfDivination,
    35: schoolOfEnchantment,
    36: schoolOfEvocation,
    37: schoolOfIllusion,
    38: schoolOfNecromancy,
    39: schoolOfTransmutation
  };

  const getImageByClass = ({
    classId,
    subclassId
  }: {
    classId: number;
    subclassId?: number;
  }) => {
    if (subclassId) return subclassImages[subclassId];
    else return classImages[classId];
  };

  return { classImages, subclassImages, getImageByClass };
};

export default useClassImages;
