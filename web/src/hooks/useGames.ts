import type { GameQuery } from '@/App';
import type { Category } from './useCategories';
// import usePaginatedData from './usePaginatedData';
import { useInfiniteQuery } from '@tanstack/react-query';
import APIClient, { type PaginatedResponse } from '@/services/api-client';
import ms from 'ms'

const apiClient = new APIClient<Game>('/games/');

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

// const useGames = (gameQuery: GameQuery) =>
//   useQuery<PaginatedResponse<Game>, Error>({
//     queryKey: ['games', gameQuery],
//     queryFn: () =>
//       apiClient
//         .getAllPaginated({
//           params: {
//             categories: gameQuery.category?.id,
//             mechanisms: gameQuery.mechanism?.id,
//             ordering: gameQuery.sortOrder,
//             search: gameQuery.searchText
//           }
//         })
//   })

const useGames = (gameQuery: GameQuery) =>
  useInfiniteQuery<PaginatedResponse<Game>, Error>({
    queryKey: ['games', gameQuery],
    queryFn: ({ pageParam }) =>
      apiClient.getAllPaginated({
        params: {
          categories: gameQuery.categoryId,
          mechanisms: gameQuery.mechanismId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;

      // if (!lastPage.next) return undefined;

      // const nextPage = new URL(lastPage.next).searchParams.get('page');
      // return nextPage ? Number(nextPage) : undefined;
    },
    staleTime: ms('10m'),
  });

export default useGames;
