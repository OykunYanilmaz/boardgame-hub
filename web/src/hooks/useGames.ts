import type { Category } from './useCategories';
import usePaginatedData from './usePaginatedData';

export interface Game {
  id: number;
  name: string;
  weight: number;
  publisher: { id: number; name: string };
  categories: Category[];
}

const useGames = (selectedCategory: Category | null) =>
  usePaginatedData<Game>(
    '/games',
    selectedCategory ? { params: { categories: selectedCategory.id } } : undefined,
    [selectedCategory?.id]
  );

export default useGames;
