import type { Category } from './useCategories';
import usePaginatedData from './usePaginatedData';

export interface Game {
  id: number;
  name: string;
  weight: number;
  publisher: { id: number; name: string };
  categories: Category[];
}

const useGames = () => usePaginatedData<Game>('/games');

export default useGames;
