import type { Game } from '@/hooks/useGames';
import { Card, Heading, HStack, Image, Text } from '@chakra-ui/react';
import CategoryIconList from './CategoryIconList';
import WeightBadge from './WeightBadge';
import getCroppedImageUrl from '@/services/image-url';
import Emoji from './Emoji';

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card.Root>
      <Image src={getCroppedImageUrl('')} />
      <Card.Body>
        <HStack justifyContent="space-between" marginBottom={3}>
          <CategoryIconList categories={game.categories}></CategoryIconList>
          <WeightBadge weight={game.weight} />
        </HStack>
        <Heading cursor={'pointer'} transition="all 0.2s ease" _hover={{ color: 'tomato' }}>
          {game.name} <Emoji yearPublished={game.yearPublished}/>
        </Heading>
      </Card.Body>
      <Card.Footer borderTop='1px solid' borderColor='tomato'>
        <Text cursor={'pointer'} transition="all 0.2s ease" _hover={{ color: 'tomato' }} marginTop={5}>{game.publisher.name}</Text>
      </Card.Footer>
    </Card.Root>
  );
};

export default GameCard;
