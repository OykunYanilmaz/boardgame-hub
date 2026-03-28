import type { GameQuery } from "@/App"
import useCategory from "@/hooks/useCategory"
import useMechanism from "@/hooks/useMechanism"
import getGameHeading from "@/utils/get-game-heading"
import { Heading } from "@chakra-ui/react"

interface Props {
    gameQuery: GameQuery
}

const GameHeading = ({gameQuery}: Props) => {
  const category = useCategory(gameQuery.categoryId);
  const mechanism = useMechanism(gameQuery.mechanismId);
  
  const heading = getGameHeading(gameQuery, category, mechanism);

  return (
    <Heading as='h1' marginTop={2} fontSize={'2xl'}>
        {heading}
    </Heading>
  )
}

export default GameHeading
