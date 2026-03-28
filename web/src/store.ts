import {create} from "zustand";

export interface GameQuery {
  categoryId?: number;
  mechanismId?: number;
  sortOrder?: string;
  searchText?: string;
}

interface GameQueryStore {
    gameQuery: GameQuery;
    setSearchText: (searchText: string) => void;
    setCategoryId: (categoryId: number) => void;
    setMechanismId: (mechanismId: number) => void;
    setSortOrder: (sortOrder: string) => void;
}

const useGameQueryStore = create<GameQueryStore>(set => ({
    gameQuery: {},
    setSearchText: (searchText) => set(() => ({ gameQuery: {searchText} })),
    setCategoryId: (categoryId) => set(store => ({ gameQuery: {...store.gameQuery, categoryId}})),
    setMechanismId: (mechanismId) => set(store => ({ gameQuery: {...store.gameQuery, mechanismId}})),
    setSortOrder: (sortOrder) => set(store => ({ gameQuery: {...store.gameQuery, sortOrder} }))
}))

export default useGameQueryStore;
