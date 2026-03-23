import type { Category } from "@/hooks/useGames"
import { HStack, Icon } from "@chakra-ui/react"
import {
  FaDragon,
  FaHatWizard,
  FaSpaceShuttle,
  FaSkull,
  FaBrain,
  FaGhost,
  FaMap,
  FaQuestion,
} from "react-icons/fa";
import {
  GiSwordman,
  GiCardPick,
  GiMagnifyingGlass,
  GiAncientSword,
  GiMeeple,
} from "react-icons/gi";
import { MdOutlineTravelExplore } from "react-icons/md";
import type { IconType } from "react-icons";
import { Tooltip } from "@/components/ui/tooltip"

interface Props {
    categories: Category[]
}

const CategoryIconList = ({ categories }: Props) => {
  const iconMap: { [key: string]: IconType } = {
    "Science Fiction": FaSpaceShuttle,
    "Fantasy": FaHatWizard,
    "Space Exploration": FaSpaceShuttle,
    "Mythology": FaDragon,
    "Ancient": GiAncientSword,
    "Wargame": GiSwordman,
    "Zombies": FaSkull,
    "Deduction": GiMagnifyingGlass,
    "Horror": FaGhost,
    "Miniatures": GiMeeple,
    "Adventure": FaMap,
    "Exploration": MdOutlineTravelExplore,
    "Card Game": GiCardPick,
    "Bluffing": FaBrain,
  };

  return (
    <HStack marginY={2}>
        {categories.map((category) => (
            <Tooltip key={category.id} content={category.name} showArrow>
                <Icon as={iconMap[category.name] || FaQuestion} boxSize={5} cursor="pointer" color='gray.500' 
                      transition="all 0.2s ease" _hover={{ color: 'orange.400', transform: "scale(1.15)" }}/>
            </Tooltip>
        ))}
    </HStack>
  )
}

export default CategoryIconList
