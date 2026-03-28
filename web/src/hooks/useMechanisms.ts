// import useDefaultData from "./useDefaultData";

import mechanisms from '../data/mechanisms.data';
import ms from 'ms';
import { useQuery } from '@tanstack/react-query';
import APIClient from '@/services/api-client';
import type { Mechanism } from '../entities/Mechanism';

const apiClient = new APIClient<Mechanism>('/mechanisms/');

// const useMechanisms = () => useDefaultData<Mechanism>('/mechanisms/')

// const useMechanisms = () => ({ data: mechanisms, isLoading: false, error: null })

const useMechanisms = () =>
  useQuery({
    queryKey: ['mechanisms'],
    // queryFn: () => apiClient.get<Mechanism[]>('/mechanisms/').then(res => res.data),
    queryFn: apiClient.getAll,
    staleTime: ms('10m'),
    initialData: mechanisms,
    // initialData: { count: mechanisms.length, results: mechanisms }
  });

export default useMechanisms;
