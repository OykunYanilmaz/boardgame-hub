import type { GameQuery } from '@/App';
import type { Category } from './useCategories';
// import usePaginatedData from './usePaginatedData';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/services/api-client';
import type { PaginatedResponse } from './usePaginatedData';

export interface Game {
  id: number;
  name: string;
  yearPublished: number;
  weight: number;
  publisher: { id: number; name: string };
  categories: Category[];
}

// const useGames = (gameQuery: GameQuery) =>
//   usePaginatedData<Game>(
//     '/games/',
//     {params: { 
//       categories: gameQuery.category?.id, 
//       mechanisms: gameQuery.mechanism?.id,
//       ordering: gameQuery.sortOrder,
//       search: gameQuery.searchText
//     }},
//     [gameQuery]
//   );

const useGames = (gameQuery: GameQuery) =>
  useQuery<PaginatedResponse<Game>, Error>({
    queryKey: ['games', gameQuery],
    queryFn: () => 
      apiClient
        .get<PaginatedResponse<Game>>('/games/', {
          params: { 
            categories: gameQuery.category?.id, 
            mechanisms: gameQuery.mechanism?.id,
            ordering: gameQuery.sortOrder,
            search: gameQuery.searchText
          }
        })
        .then(res => res.data)
  })

export default useGames;
