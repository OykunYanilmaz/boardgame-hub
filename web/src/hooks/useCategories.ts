import useDefaultData from "./useDefaultData";

export interface Category {
    id: number;
    name: string
}

const useCategories = () => useDefaultData<Category>('/categories/')

export default useCategories;
