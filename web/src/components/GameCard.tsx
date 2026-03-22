import type { Game } from "@/hooks/useGames"
import { Card, Heading, Image } from "@chakra-ui/react"
import placeholder from "../assets/no-image-placeholder.webp"

interface Props {
    game: Game
}

const GameCard = ({ game }: Props) => {
  return (
    <Card.Root borderRadius={25} overflow='hidden'>
        <Image src={placeholder} />
        <Card.Body>
            <Heading>{game.name}</Heading>
        </Card.Body>
        <Card.Footer></Card.Footer>
    </Card.Root>
  )
}

export default GameCard
