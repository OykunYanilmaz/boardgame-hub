import useGames from '@/hooks/useGames';
import { SimpleGrid, Text } from '@chakra-ui/react';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';
import GameCardContainer from './GameCardContainer';

const GameGrid = () => {
  const { paginatedData, error, isLoading } = useGames();  
  const skeletons = [1, 2, 3, 4, 5, 6]

  return (
    <>
      { error && <Text>{error}</Text>}
      <SimpleGrid gap={3} padding='15px' columns={{ sm: 1, md: 2, lg: 3, xl: 4}}>
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
    </>
  );
};

export default GameGrid;
