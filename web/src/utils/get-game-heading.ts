import type { Category } from '@/entities/Category';
import type { Mechanism } from '@/entities/Mechanism';
import type { GameQuery } from '@/store';

const getGameHeading = (gameQuery: GameQuery, category?: Category, mechanism?: Mechanism) => {
  return `${gameQuery.categoryId ? category?.name + ' - ' : ''} 
            ${gameQuery.mechanismId ? mechanism?.name + ' - ' : ''} 
            Board Games`;
};

export default getGameHeading;
