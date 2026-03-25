// import useDefaultData from "./useDefaultData";
import categories from '../data/categories-data'

export interface Category {
    id: number;
    name: string
}

// const useCategories = () => useDefaultData<Category>('/categories/')
const useCategories = () => ({ data: categories, isLoading: false, error: null })

export default useCategories;
