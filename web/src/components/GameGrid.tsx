// import type { GameQuery } from '@/App';
import useGames from '@/hooks/useGames';
import { SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import GameCard from './GameCard';
import GameCardContainer from './GameCardContainer';
import GameCardSkeleton from './GameCardSkeleton';
import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

// interface Props {
//   gameQuery: GameQuery,
// }

const GameGrid = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames();  
  const skeletons = [1, 2, 3, 4, 5, 6]

  if (error) return <Text>{error.message}</Text>;

  const fetchedGamesCount = data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    // <Box padding='15px'>
      <InfiniteScroll dataLength={fetchedGamesCount} hasMore={!!hasNextPage} next={() => fetchNextPage()} loader={<Spinner />}>
        <SimpleGrid gap={6} padding='15px' columns={{ sm: 1, md: 2, lg: 3, xl: 4}}>
          { isLoading && skeletons.map(skeleton => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
          {data?.pages.map((page, index) => 
            <React.Fragment key={index}>
              {page.results.map(game => 
                <GameCardContainer key={game.id}>
                  <GameCard game={game} />
                </GameCardContainer>
              )}
            </React.Fragment>
          )}
          {/* {data?.results.map(game => 
            <GameCardContainer key={game.id}>
              <GameCard game={game} />
            </GameCardContainer>
          )} */}
        </SimpleGrid>
      </InfiniteScroll>
      /* {hasNextPage && (
        <Button borderColor='tomato' width={'100%'} variant="outline" marginY={5} onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </Button>
      )} */
    /* </Box>  */
  );
};

export default GameGrid;
