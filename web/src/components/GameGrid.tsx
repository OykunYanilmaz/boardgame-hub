import type { GameQuery } from '@/App';
import useGames from '@/hooks/useGames';
import { SimpleGrid, Text } from '@chakra-ui/react';
import GameCard from './GameCard';
import GameCardContainer from './GameCardContainer';
import GameCardSkeleton from './GameCardSkeleton';

interface Props {
  gameQuery: GameQuery,
}

const GameGrid = ({gameQuery}: Props) => {
  const { paginatedData, error, isLoading } = useGames(gameQuery);  
  const skeletons = [1, 2, 3, 4, 5, 6]

  if (error) return <Text>{error}</Text>;

  return (
    <SimpleGrid gap={6} padding='15px' columns={{ sm: 1, md: 2, lg: 3, xl: 4}}>
      { isLoading && skeletons.map(skeleton => (
        <GameCardContainer key={skeleton}>
          <GameCardSkeleton />
        </GameCardContainer>
      ))}
      {paginatedData.map(game => 
        <GameCardContainer key={game.id}>
          <GameCard game={game} />
        </GameCardContainer>
      )}
    </SimpleGrid>
  );
};

export default GameGrid;
