import type { Game } from "@/hooks/useGames"
import { Card, Heading, HStack, Image } from "@chakra-ui/react"
import placeholder from "../assets/no-image-placeholder.webp"
import CategoryIconList from "./CategoryIconList"
import WeightBadge from "./WeightBadge"

interface Props {
    game: Game
}

const GameCard = ({ game }: Props) => {
  return (
    <Card.Root borderRadius={25} overflow='hidden'>
        <Image src={placeholder} />
        <Card.Body>
            <Heading cursor={'pointer'} transition="all 0.2s ease" _hover={{ color: 'tomato' }}>{game.name}</Heading>
            <HStack justifyContent='space-between'>
              <CategoryIconList categories={game.categories}></CategoryIconList>
              <WeightBadge weight={game.weight} />
            </HStack>
        </Card.Body>
        <Card.Footer></Card.Footer>
    </Card.Root>
  )
}

export default GameCard
