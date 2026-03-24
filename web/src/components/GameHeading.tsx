import type { GameQuery } from "@/App"
import getGameHeading from "@/utils/get-game-heading"
import { Heading } from "@chakra-ui/react"

interface Props {
    gameQuery: GameQuery
}

const GameHeading = ({gameQuery}: Props) => {
  const heading = getGameHeading(gameQuery)

  return (
    <Heading as='h1' marginTop={2} fontSize={'2xl'}>
        {heading}
    </Heading>
  )
}

export default GameHeading
