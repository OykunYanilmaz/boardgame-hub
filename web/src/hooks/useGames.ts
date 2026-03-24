import type { GameQuery } from '@/App';
import type { Category } from './useCategories';
import usePaginatedData from './usePaginatedData';

export interface Game {
  id: number;
  name: string;
  weight: number;
  publisher: { id: number; name: string };
  categories: Category[];
}

const useGames = (gameQuery: GameQuery) =>
  usePaginatedData<Game>(
    '/games/',
    {params: { 
      categories: gameQuery.category?.id, 
      mechanisms: gameQuery.mechanism?.id,
      ordering: gameQuery.sortOrder
    }},
    [gameQuery]
  );

export default useGames;
