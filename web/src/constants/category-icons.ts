import {
  FaDragon,
  FaHatWizard,
  FaSpaceShuttle,
  FaSkull,
  FaBrain,
  FaGhost,
  FaMap,
  FaQuestion,
} from 'react-icons/fa';
import {
  GiSwordman,
  GiCardPick,
  GiMagnifyingGlass,
  GiAncientSword,
  GiMeeple,
} from 'react-icons/gi';
import { MdOutlineTravelExplore } from 'react-icons/md';
import type { IconType } from 'react-icons';

const iconMap: { [key: string]: IconType } = {
  'Science Fiction': FaSpaceShuttle,
  Fantasy: FaHatWizard,
  'Space Exploration': FaSpaceShuttle,
  Mythology: FaDragon,
  Ancient: GiAncientSword,
  Wargame: GiSwordman,
  Zombies: FaSkull,
  Deduction: GiMagnifyingGlass,
  Horror: FaGhost,
  Miniatures: GiMeeple,
  Adventure: FaMap,
  Exploration: MdOutlineTravelExplore,
  'Card Game': GiCardPick,
  Bluffing: FaBrain,
};

export const getCategoryIcon = (name: string): IconType => iconMap[name] || FaQuestion;
