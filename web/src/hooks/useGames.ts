import apiClient from "@/services/api-client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

export interface Category {
    id: number;
    name: string
}

export interface Game {
    id: number;
    name: string;
    weight: number;
    categories: Category[]
}

type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[]
}

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
    const controller = new AbortController()    

    apiClient.get<PaginatedResponse<Game>>('/games/', { signal: controller.signal })
                .then(res => setGames(res.data.results))
                .catch(err => {
                    if(err instanceof CanceledError) return;
                    setError(err.message)
                })
    
    return () => controller.abort();
                
    }, []);

    return { games, error }
}

export default useGames;
