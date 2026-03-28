import type { GameQuery } from '@/App';
import type { Category } from '@/hooks/useCategories';
import type { Mechanism } from '@/hooks/useMechanisms';

const getGameHeading = (gameQuery: GameQuery, category?: Category, mechanism?: Mechanism) => {
  return `${gameQuery.categoryId ? category?.name + ' - ' : ''} 
            ${gameQuery.mechanismId ? mechanism?.name + ' - ' : ''} 
            Board Games`;
};

export default getGameHeading;
