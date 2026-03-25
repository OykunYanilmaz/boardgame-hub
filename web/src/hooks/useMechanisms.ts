// import useDefaultData from "./useDefaultData";

import mechanisms from '../data/mechanisms.data';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/services/api-client';

export interface Mechanism {
  id: number;
  name: string;
}

// const useMechanisms = () => useDefaultData<Mechanism>('/mechanisms/')

// const useMechanisms = () => ({ data: mechanisms, isLoading: false, error: null })

const useMechanisms = () => useQuery({
  queryKey: ['mechanisms'],
  queryFn: () => apiClient.get<Mechanism[]>('/mechanisms/').then(res => res.data),
  staleTime: 10 * 60 * 1000,
  initialData: mechanisms
  // initialData: { count: mechanisms.length, results: mechanisms }
})

export default useMechanisms;
