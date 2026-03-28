// import useDefaultData from "./useDefaultData";
import categories from '../data/categories-data'
import APIClient from '@/services/api-client';
import { useQuery } from '@tanstack/react-query';
import ms from 'ms'

const apiClient = new APIClient<Category>('/categories/');

export interface Category {
    id: number;
    name: string
}

// const useCategories = () => useDefaultData<Category>('/categories/')

// const useCategories = () => ({ data: categories, isLoading: false, error: null })

const useCategories = () => useQuery({
    queryKey: ['categories'],
    // queryFn: () => apiClient.get<Category[]>('/categories/').then(res => res.data),
    queryFn: apiClient.getAll,
    staleTime: ms('10m'),
    initialData: categories
})

export default useCategories;
