// import type { GameQuery } from "@/App"
import useCategory from "@/hooks/useCategory"
import useMechanism from "@/hooks/useMechanism"
import useGameQueryStore from "@/store"
import getGameHeading from "@/utils/get-game-heading"
import { Heading } from "@chakra-ui/react"

// interface Props {
//     gameQuery: GameQuery
// }

const GameHeading = () => {
  const gameQuery = useGameQueryStore(s => s.gameQuery);
  const categoryId = useGameQueryStore(s => s.gameQuery.categoryId);
  const mechanismId = useGameQueryStore(s => s.gameQuery.mechanismId);

  const category = useCategory(categoryId);
  const mechanism = useMechanism(mechanismId);
  
  const heading = getGameHeading(gameQuery, category, mechanism);

  return (
    <Heading as='h1' marginTop={2} fontSize={'2xl'}>
        {heading}
    </Heading>
  )
}

export default GameHeading
