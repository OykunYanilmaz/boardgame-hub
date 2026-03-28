// import useDefaultData from "./useDefaultData";

import mechanisms from '../data/mechanisms.data';
import ms from 'ms'
import { useQuery } from '@tanstack/react-query';
import APIClient from '@/services/api-client';


const apiClient = new APIClient<Mechanism>('/mechanisms/');

export interface Mechanism {
  id: number;
  name: string;
}

// const useMechanisms = () => useDefaultData<Mechanism>('/mechanisms/')

// const useMechanisms = () => ({ data: mechanisms, isLoading: false, error: null })

const useMechanisms = () => useQuery({
  queryKey: ['mechanisms'],
  // queryFn: () => apiClient.get<Mechanism[]>('/mechanisms/').then(res => res.data),
  queryFn: apiClient.getAll,
  staleTime: ms('10m'),
  initialData: mechanisms
  // initialData: { count: mechanisms.length, results: mechanisms }
})

export default useMechanisms;
